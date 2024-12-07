import queue
from threading import Thread, Event
from gamepad_listeners import run_gamepad_listener
from mouse_listeners import run_mouse_listener
from keyboard_listeners import run_keyboard_listener
from format_send_data import send_data, receive_data, print_output
from inputs import devices
from socketEvents import connect_to_server, create_socket


def handle_inputs_active(
    data_received,
    keyboard_thread,
    mouse_thread,
    gamepad_thread,
    keyboard_stop_event,
    mouse_stop_event,
    gamepad_stop_event,
    connection,
    error_queue,
):

    if data_received.get("eventType") == "inputs-active":
        print_output(f"handle_inputs_active: {data_received}")

        new_inputs_active = data_received.get("data")
        if new_inputs_active["keyboardActive"]:
            if not keyboard_thread.is_alive():
                keyboard_stop_event.clear()
                keyboard_thread = Thread(
                    target=run_keyboard_listener,
                    args=(connection, error_queue, keyboard_stop_event),
                    daemon=True,
                )
                keyboard_thread.start()
        else:
            keyboard_stop_event.set()

        if new_inputs_active["mouseActive"]:
            if not mouse_thread.is_alive():
                mouse_stop_event.clear()
                mouse_thread = Thread(
                    target=run_mouse_listener,
                    args=(connection, error_queue, mouse_stop_event),
                    daemon=True,
                )
                mouse_thread.start()
        else:
            mouse_stop_event.set()

        if new_inputs_active["joystickActive"]:
            if not gamepad_thread.is_alive():
                gamepad_stop_event.clear()
                gamepad_thread = Thread(
                    target=run_gamepad_listener,
                    args=(connection, error_queue, gamepad_stop_event),
                    daemon=True,
                )
                gamepad_thread.start()
        else:
            gamepad_stop_event.set()

    return keyboard_thread, mouse_thread, gamepad_thread


def main():
    sock = None
    connection = None
    error_queue = queue.Queue()
    print_output("Iniciando socket...")
    run = True
    keyboard_stop_event = Event()
    mouse_stop_event = Event()
    gamepad_stop_event = Event()

    try:
        sock = create_socket()
        connection = connect_to_server(sock)

        if not connection:
            return
        keyboard_thread = Thread(
            target=run_keyboard_listener,
            args=(connection, error_queue, keyboard_stop_event),
            daemon=True,
        )
        mouse_thread = Thread(
            target=run_mouse_listener,
            args=(connection, error_queue, mouse_stop_event),
            daemon=True,
        )
        gamepad_thread = Thread(
            target=run_gamepad_listener,
            args=(connection, error_queue, gamepad_stop_event),
            daemon=True,
        )
        devices._detect_gamepads()

        while run:

            if not error_queue.empty():
                error_message = error_queue.get()
                raise Exception(error_message)

            data_received = receive_data(connection)
            keyboard_thread, mouse_thread, gamepad_thread = handle_inputs_active(
                data_received,
                keyboard_thread,
                mouse_thread,
                gamepad_thread,
                keyboard_stop_event,
                mouse_stop_event,
                gamepad_stop_event,
                connection,
                error_queue,
            )

    except KeyboardInterrupt:
        print_output({"Shutting down client python socket..."})
    except Exception as e:
        print_output({f"Error python socket: {e}"})
        run = False
    finally:
        try:
            keyboard_stop_event.set()
            mouse_stop_event.set()
            gamepad_stop_event.set()

            keyboard_thread.join()
            mouse_thread.join()
            if gamepad_thread:
                gamepad_thread.join()

            if connection:
                connection.close()
            if sock:
                sock.close()
        except Exception as e:
            run = False
            send_data(connection, {f"Error python socket: {e}"})


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print({"main": "Error", "data": {"message": e}})
