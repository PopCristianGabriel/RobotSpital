import asyncio
import serial
import sys
sys.path.append('/home/pi/.local/lib/python3.7/site-packages')
import websockets


arduino = serial.Serial(port='/dev/ttyACM0', baudrate=9600)


def set_power(left, right):
    left = int(left)
    right = int(right)

    if left >= 0:
        direction_left = '+'
    else:
        direction_left = '-'

    if right >= 0:
        direction_right = '+'
    else:
        direction_right = '-'

    command = direction_left + str(chr(abs(left))) + direction_right + str(chr(abs(right))) + '\n'

    arduino.write(command.encode())


async def hello(websocket, path):
    name = await websocket.recv()
    print(name)
    if name == "The robot should move forward":
        set_power(200, 200)
    elif name == "The robot should move right":
        set_power(0, 200)
    elif name == "The robot should move backwards":
        set_power(-200, -200)
    elif name == "The robot should move left":
        set_power(200, 0)
    elif name == "Stop":
        set_power(0,0)


start_server = websockets.serve(hello, "192.168.0.125", 8765)

asyncio.get_event_loop().run_until_complete(start_server)

asyncio.get_event_loop().run_forever()
