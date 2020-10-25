import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import RobotInterface from './RobotInterface';
import SensorInterface from './SensorInterface'
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import io from "socket.io-client"

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
});
ReactDOM.render(<SensorInterface />, document.getElementById('appbody'));
ReactDOM.render(<RobotInterface />, document.getElementById('appbody'));

var command_count = 0;
/*var ws;
function connect_to_server(data){
	ws = io('ws://192.168.0.125:8765', {transports: ['websocket']});
    ws.on('connect', function() {
        ws.emit('my connect', {data: 'I\'m connected!'});
    });
}

function send_data_to_server(data){
		ws.emit('my moves', data);
		command_count++;
		if (command_count > 15) {
			connect_to_server(state);
			command_count = 0;
		}
}*/

var socket;
function connect_to_server(data){
	socket = new WebSocket('ws://192.168.0.125:8765');
	socket.addEventListener('open', function (event) {
    	socket.send('Hello server!');
	});

	socket.addEventListener('message', function (event) {
	    console.log('Message from server ', event.data);
	    const sensorsInfo = JSON.parse(event.data);
	    updateSensors(sensorsInfo);
	});

	socket.addEventListener('close', function (event) {
	    console.log('Connection closed with the server');
	    socket.close();
	});
}

function send_data_to_server(data){
	socket.send(data);
}

function  updateSensors(sensorsInfo){
	const sensorColor0 = sensorsInfo["sensor_0"];
	const sensorColor1 = sensorsInfo["sensor_1"];
	document.getElementById('sensor0').style.color = sensorColor0;
	document.getElementById('sensor1').style.color = sensorColor1;
}


var prev_state = "connected";
var state;
const keyDownFunction = function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	console.log(keycode);
	prev_state = state;
	/*up*/
	if (keycode == '38'){
		state = "front";
		document.getElementById("up-arrow").style.color = "#34eb71";
	}

	/*right*/
	if (keycode == '39'){
		state = "right";
		document.getElementById("right-arrow").style.color = "#34eb71";
	}

	/*down*/
	if (keycode == '40'){
		state = "back";
		document.getElementById("down-arrow").style.color = "#34eb71";
	}

	/*left*/
	if (keycode == '37'){
		state = "left";
		document.getElementById("left-arrow").style.color = "#34eb71";
	}

	/*stop - spacebar*/
	if (keycode == '32'){
		state = "stop";
		document.getElementById("space-arrow").style.color = "#ff0000";
	}

	if (prev_state != state) {
		console.log(state);
	//	send_data_to_server(state);
	}
}

const keyUpFunction = function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	console.log(keycode);
	prev_state = state;
	/*up*/
	if (keycode == '38'){
		state = "stop";
		document.getElementById("up-arrow").style.color = "#000000";
	}

	/*right*/
	if (keycode == '39'){
		state = "stop";
		document.getElementById("right-arrow").style.color = "#000000";

	}

	/*down*/
	if (keycode == '40'){
		state = "stop";
		document.getElementById("down-arrow").style.color = "#000000";
	}

	/*left*/
	if (keycode == '37'){
		state = "stop";
		document.getElementById("left-arrow").style.color = "#000000";
	}

	/*stop - spacebar*/
	if (keycode == '32'){
		state = "stop";
		document.getElementById("space-arrow").style.color = "#000000";
	}
		state = "stop";

	console.log(state);
	//send_data_to_server(state);
}

console.log("websockets connected");
connect_to_server("websockets connected");
document.addEventListener("keydown", keyDownFunction, false);
document.addEventListener("keyup", keyUpFunction, false);
