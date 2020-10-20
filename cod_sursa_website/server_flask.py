from flask import Flask, render_template
from flask_socketio import SocketIO
import asyncio
import serial
import sys
import time
sys.path.append('/home/pi/.local/lib/python3.7/site-packages')

#arduino = serial.Serial(port='/dev/ttyACM0', baudrate=9600)

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
    ############################################
    #arduino.write(chr(direction_left).encode(encoding='ascii'))
    #arduino.write(chr(abs(left)).encode(encoding='ascii'))
    #arduino.write(chr(direction_right).encode(encoding='ascii'))
    #arduino.write(chr(abs(right)).encode(encoding='ascii'))
    ############################################

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins='*')

@socketio.on('my connect')
def handle_my_custom_event(json):
    print('connected')

@socketio.on('my moves')
def handle_my_custom_event(json):
    name = str(json)
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

if __name__ == '__main__':
    socketio.run(app, host='127.0.0.1', port=8765)

