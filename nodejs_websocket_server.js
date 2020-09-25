const WebSocket = require('ws');
const SerialPort = require('serialport');

const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
const wss = new WebSocket.Server({ ip:'192.168.0.125', port: 8765 });
 
function set_power(left, right) {
	var direction_left, direction_right;
	if (left >= 0)
		direction_left = 1;
	else
		direction_left = 2;
	
	if (right >= 0)
		direction_right = 1;
	else 
		direction_right = 2;

	port.write(String.fromCharCode(direction_left));
	port.write(String.fromCharCode(Math.abs(left)));
	port.write(String.fromCharCode(direction_right));
	port.write(String.fromCharCode(Math.abs(right)));
}

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log(message);
	  var name = message;
	 if (name == "front")
        	set_power(125, 125);
	  else if (name == "right")
        	set_power(-125, 125);
	  else if (name == "back")
        	set_power(-125, -125);
	  else if (name == "left")
        	set_power(125, -125);
	  else if (name == "stop")
        	set_power(0,0);
	 port.flush();
  });
 
  ws.send('Connected with the server');
});
