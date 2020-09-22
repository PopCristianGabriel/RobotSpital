import asyncio
import serial
import sys
import time
sys.path.append('/home/pi/.local/lib/python3.7/site-packages')
import websockets


arduino = serial.Serial(port='/dev/ttyACM0', baudrate=9600)

#while (True):
#    arduino.write(chr(14).encode(encoding='ascii'))
#    arduino.write(chr(99).encode(encoding='ascii'))
#    time.sleep(3)

def set_power(left, right):
    left = int(left)
    right = int(right)

    if left >= 0:
        direction_left = 1
    else:
        direction_left = 2

    if right >= 0:
        direction_right = 1
    else:
        direction_right = 2
    #command = direction_left + str(chr(abs(left))) + direction_right + str(chr(abs(right))) + 'x'
    ############################################
    arduino.write(chr(direction_left).encode(encoding='ascii'))
    arduino.write(chr(abs(left)).encode(encoding='ascii'))
    arduino.write(chr(direction_right).encode(encoding='ascii'))
    arduino.write(chr(abs(right)).encode(encoding='ascii'))
    ############################################
    #print(command)
    #arduino.write(command.encode())


async def hello(websocket, path):
    while (True):
        name = await websocket.recv()
        print(name)
        if name == "front":
            set_power(100, 100)
            set_power(100, 100)
        elif name == "right":
            set_power(-100, 100)
        elif name == "back":
            set_power(-100, -100)
            set_power(-100, -100)
        elif name == "left":
            set_power(100, -100)
        elif name == "stop":
            set_power(0,0)
            set_power(0,0)


start_server = websockets.serve(hello, "192.168.0.125", 8765)

asyncio.get_event_loop().run_until_complete(start_server)

asyncio.get_event_loop().run_forever()
