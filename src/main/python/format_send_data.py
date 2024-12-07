import json
import socket
import sys


def print_output(message: str):
    print(message)
    sys.stdout.flush()


def send_data(connection, data_to_send):
    try:
        message = json.dumps(data_to_send).encode("utf-8") + b"\n"
        connection.sendall(message)
        return True
    except (socket.error, BrokenPipeError) as e:
        raise Exception(f"send_data error: {e}") from e


def receive_data(connection):
    try:
        data_buffer = ""
        data_buffer += connection.recv(1024).decode("utf-8")
        message = ""

        while "\n" in data_buffer:
            message, data_buffer = data_buffer.split("\n", 1)
            try:
                parsed_data = json.loads(message)
                message = parsed_data
            except json.JSONDecodeError:
                raise Exception("receive_data error: JSONDecodeError")

        return message
    except (socket.error, BrokenPipeError) as e:
        raise Exception(f"receive_data error: {e}") from e
