import asyncio
import websockets

async def hello(websocket,path):
    name = await websocket.recv()
    print(name)

start_server = websockets.serve(hello, "192.168.43.51", 8765)

asyncio.get_event_loop().run_until_complete(start_server)

asyncio.get_event_loop().run_forever()
