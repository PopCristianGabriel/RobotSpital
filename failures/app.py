from flask import Flask, render_template, Response
from picamera import PiCamera
from picamera.array import PiRGBArray
import cv2
import time

app = Flask(__name__)

camera = PiCamera()  # use 0 for web camera
camera.resolution = (640,480)
camera.framerate = 32
rawCapture = PiRGBArray(camera, size=(640, 480))
#  for cctv camera use rtsp://username:password@ip_address:554/user=username_password='password'_channel=channel_number_strea0.sdp' instead of camera

time.sleep(0.1)

def gen_frames():  # generate frame by frame from camera
    for frame in camera.capture_continuous(rawCapture, format="bgr", use_video_port=True):
        # Capture frame-by-frame
        
        success = frame
        if not success:
            break
        else:
            ret, buffer = frame
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result


@app.route('/video_feed')
def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return Response(gen_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/')
def index():
    """Video streaming home page."""
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host='192.168.43.51', port=8080)
