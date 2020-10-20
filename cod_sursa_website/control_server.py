import asyncio
import sys
sys.path.append('/home/pi/.local/lib/python3.7/site-packages')
import websockets
from flask_socketio import SocketIO

def set_power(a, b):
    return a+b


async def hello(websocket, path):
    while True:
        name = await websocket.recv()
        print(name)
        if name == "front":
            set_power(100, 100)
        elif name == "right":
            set_power(0, 100)
        elif name == "back":
            set_power(-100, -100)
        elif name == "left":
            set_power(100, 0)
        elif name == "stop":
            set_power(0,0)

start_server = websockets.serve(hello, "127.0.0.1", 8765)

asyncio.get_event_loop().run_until_complete(start_server)

asyncio.get_event_loop().run_forever()
