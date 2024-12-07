import socket
import json
from format_send_data import print_output

HOST = "127.0.0.1"
PORT = 65432


def create_socket():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    return sock


def connect_to_server(sock):
    try:
        sock.bind((HOST, PORT))
        sock.listen(1)
        conn, addr = sock.accept()
        data_to_send = f"Connected to {addr}"
        message = json.dumps(data_to_send).encode("utf-8") + b"\n"
        conn.sendall(message)
        return conn
    except (socket.timeout, socket.error) as e:
        print_output(f"Error connecting to server: {e}")
        return False
