import time
from format_send_data import send_data
from inputs import devices
from pynput import keyboard


def run_keyboard_listener(connection, error_queue, stop_event):
    """Keyboard listener que envía datos hasta que se detenga."""
    listener = None
    try:
        while not stop_event.is_set():
            if not listener:
                listener = start_keyboard_listener(connection, error_queue)
                send_data(
                    connection,
                    {
                        "eventType": "keyboardConnected",
                        "name": devices.keyboards[0].name,
                    },
                )

            time.sleep(0.1)
        if listener:
            listener.stop()
            send_data(
                connection,
                {
                    "eventType": "keyboardDisconnected",
                    "name": devices.keyboards[0].name,
                },
            )

    except Exception as e:
        error_queue.put(f"run_keyboard_listener: {e}")


def start_keyboard_listener(connection, error_queue):
    """Inicia el listener del teclado y lo devuelve."""
    try:
        listener = keyboard.Listener(
            on_press=lambda key: on_key_press(key, connection, error_queue),
            on_release=lambda key: on_key_release(key, connection, error_queue),
        )
        listener.start()
        return listener

    except Exception as e:
        error_queue.put(f"start_keyboard_listener: {e}")
        raise


def format_key(key):
    try:
        if key in key_mapping:
            return key_mapping[key]
        if hasattr(key, "char") and key.char is not None:
            return key.char.upper()
        return str(key)
    except Exception as e:
        return f"Error formateando la tecla: {e}"


def on_key_press(key, connection, error_queue):
    formatted_key = format_key(key)
    data = {
        "eventType": "keydown",
        "friendlyName": formatted_key,
    }
    try:
        send_data(connection, data)
    except Exception as e:
        error_queue.put(f"on_key_press: {e}")


def on_key_release(key, connection, error_queue):
    formatted_key = format_key(key)
    data = {
        "eventType": "keyup",
        "friendlyName": formatted_key,
    }
    try:
        send_data(connection, data)
    except Exception as e:
        error_queue.put(f"on_key_release: {e}")


key_mapping = {
    keyboard.Key.f1: "F1",
    keyboard.Key.f2: "F2",
    keyboard.Key.f3: "F3",
    keyboard.Key.f4: "F4",
    keyboard.Key.f5: "F5",
    keyboard.Key.f6: "F6",
    keyboard.Key.f7: "F7",
    keyboard.Key.f8: "F8",
    keyboard.Key.f9: "F9",
    keyboard.Key.f10: "F10",
    keyboard.Key.f11: "F11",
    keyboard.Key.f12: "F12",
    keyboard.Key.esc: "Esc",
    keyboard.Key.tab: "Tab",
    keyboard.Key.enter: "Enter",
    keyboard.Key.backspace: "Backspace",
    keyboard.Key.caps_lock: "CapsLock",
    keyboard.Key.shift_l: "Shift",
    keyboard.Key.ctrl_l: "Ctrl",
    keyboard.Key.alt_l: "Alt",
    keyboard.Key.space: " ",
    keyboard.Key.cmd: "Meta",
    keyboard.Key.up: "↑",
    keyboard.Key.down: "↓",
    keyboard.Key.left: "←",
    keyboard.Key.right: "→",
    keyboard.Key.delete: "Delete",
    keyboard.Key.page_down: "PageDown",
    keyboard.Key.page_up: "PageUp",
    keyboard.Key.home: "Home",
    keyboard.Key.end: "End",
    keyboard.Key.insert: "Insert",
    keyboard.Key.media_play_pause: "⏵/⏸",
    keyboard.Key.media_volume_mute: "Mute",
    keyboard.Key.media_volume_down: "Vol-",
    keyboard.Key.media_volume_up: "Vol+",
    keyboard.Key.media_next: ">>|",
    keyboard.Key.media_previous: "|<<",
    keyboard.Key.num_lock: "NumLock",
    keyboard.Key.scroll_lock: "ScrollLock",
    keyboard.Key.pause: "Pause",
    keyboard.Key.menu: "Menu",
}
