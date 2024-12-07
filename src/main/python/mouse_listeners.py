import time
from format_send_data import send_data
from pynput import mouse
from inputs import devices


def run_mouse_listener(connection, error_queue, stop_event):
    listener = None
    try:
        while not stop_event.is_set():
            if not listener:
                listener = start_mouse_listener(connection, error_queue)
                send_data(
                    connection,
                    {"eventType": "mouseConnected", "name": devices.mice[0].name},
                )

            time.sleep(0.1)  # Small sleep to prevent busy-waiting
        if listener:
            listener.stop()
            send_data(
                connection,
                {"eventType": "mouseDisconnected", "name": devices.mice[0].name},
            )

    except Exception as e:
        error_queue.put(f"run_mouse_listener: {e}")


def start_mouse_listener(connection, error_queue):
    try:
        listener = mouse.Listener(
            on_click=lambda x, y, button, pressed: on_click(
                x, y, button, pressed, connection, error_queue
            ),
            on_scroll=lambda x, y, dx, dy: on_scroll(
                x, y, dx, dy, connection, error_queue
            ),
        )
        listener.start()
        return listener

    except Exception as e:
        error_queue.put(f"start_mouse_listener: {e}")
        raise


def on_click(x, y, button, pressed, connection, error_queue):
    if pressed:
        data = {
            "eventType": "mouseClicked",
            "data": button.name,
        }
        try:
            send_data(connection, data)
        except Exception as e:
            error_queue.put(f"mouseClicked: {e}")
    else:
        data = {
            "eventType": "mouseReleased",
            "data": button.name,
        }
        try:
            send_data(connection, data)
        except Exception as e:
            error_queue.put(f"mouseReleased: {e}")


def on_scroll(x, y, dx, dy, connection, error_queue):
    if dy > 0:
        data = {
            "eventType": "wheelUp",
            "data": True,
        }
        try:
            send_data(connection, data)
        except Exception as e:
            error_queue.put(f"wheelUp: {e}")
    else:
        data = {
            "eventType": "wheelDown",
            "data": True,
        }
        try:
            send_data(connection, data)
        except Exception as e:
            error_queue.put(f"wheelDown: {e}")
