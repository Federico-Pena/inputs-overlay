import time
from inputs import get_gamepad, UnpluggedError, devices
from format_send_data import send_data


def handle_gamepad_event(event):
    if event.code in FRIENDLY_NAMES:
        friendly_name = FRIENDLY_NAMES[event.code]
    else:
        friendly_name = {"xbox": event.code, "playstation": event.code}

    event_type = None

    if event.ev_type == "Key":
        event_type = "GamepadButton"

    elif event.ev_type == "Absolute":
        if "ABS_X" in event.code or "ABS_Y" in event.code:
            event_type = "GamepadAxis"

        elif "ABS_RX" in event.code or "ABS_RY" in event.code:
            event_type = "GamepadAxis"

        elif "ABS_HAT" in event.code:
            event_type = "GamepadButton"
            if "ABS_HAT0X" in event.code:
                if event.state == 1:
                    friendly_name = "right"
                elif event.state == -1:
                    friendly_name = "left"
                else:
                    friendly_name = "releasedX"

            if "ABS_HAT0Y" in event.code:
                if event.state == 1:
                    friendly_name = "down"
                elif event.state == -1:
                    friendly_name = "up"
                else:
                    friendly_name = "releasedY"

        elif "ABS_RZ" in event.code or "ABS_Z" in event.code:
            event_type = "GamepadButton"

        else:
            event_type = "GamepadUnknown"

    data = {
        "eventType": event_type,
        "code": event.code,
        "state": event.state,
        "friendlyName": friendly_name,
    }

    return data


def run_gamepad_listener(connection, error_queue, stop_event):
    gamepad = None
    try:
        while not stop_event.is_set():
            try:
                if len(devices.gamepads):

                    if not gamepad:
                        gamepad = devices.gamepads[0]
                        send_data(connection, "Gamepad listener started.")
                        send_data(
                            connection,
                            {
                                "eventType": "gamepadConnected",
                                "data": {"name": gamepad.name},
                            },
                        )

                    events = get_gamepad()
                    for event in events:
                        if event.code == "SYN_REPORT":
                            continue
                        data = handle_gamepad_event(event)
                        if not send_data(connection, data):
                            send_data(connection, "Error sending gamepad data.")
                            return False
                else:
                    send_data(
                        connection,
                        {
                            "eventType": "gamepadUnplugged",
                            "data": "Waiting for gamepads",
                        },
                    )
                    gamepad = None
                    devices.gamepads.clear()
                    devices._detect_gamepads()
                    time.sleep(1)
            except UnpluggedError as e:
                if gamepad:
                    send_data(
                        connection,
                        {
                            "eventType": "gamepadDisconnected",
                            "data": {"name": gamepad.name},
                        },
                    )
                else:
                    send_data(
                        connection,
                        {
                            "eventType": "gamepadUnplugged",
                            "data": "Waiting for gamepads",
                        },
                    )
                gamepad = None
                devices.gamepads.clear()
                devices._detect_gamepads()
                time.sleep(5)
        if gamepad:
            gamepad = None
            send_data(connection, "Gamepad listener stopped.")

    except Exception as e:
        error_queue.put(f"run_gamepad_listener: {e}")


FRIENDLY_NAMES = {
    "BTN_SOUTH": "Cross",
    "BTN_EAST": "Circle",
    "BTN_NORTH": "Triangle",
    "BTN_WEST": "Square",
    "BTN_TL": "L1",
    "BTN_TR": "R1",
    "ABS_RZ": "R2",
    "ABS_Z": "L2",
    "BTN_START": "Select",
    "BTN_SELECT": "Start",
    "BTN_THUMBL": "L3",
    "BTN_THUMBR": "R3",
    "ABS_RX": "Stick-Right-Horizontal",
    "ABS_RY": "Stick-Right-Vertical",
    "ABS_Y": "Stick-Left-Vertical",
    "ABS_X": "Stick-Left-Horizontal",
    "ABS_HAT0X": "D-Pad-Horizontal",
    "ABS_HAT0Y": "D-Pad-Vertical",
}
