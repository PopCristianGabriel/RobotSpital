const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ ip:'127.0.0.1', port: 8765 });
 
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log(message);
  });
 
  ws.send('Connected with the server');
});