// controllers/websocket.ts
import * as url from 'url';
import { WebSocket } from 'ws';
const { setupWSConnection } = require('y-websocket/bin/utils');

const rooms = new Map();

export const handleWebSocketConnection = (ws: WebSocket, req: { url: string }) => {
  const pathname = url.parse(req.url).pathname;
  if (pathname === null) {
    console.error("ルーム名が取得できなかったのだ...😭");
    return;
  }
  
  const roomName = pathname.slice(1);
  
  // ルームが存在しない場合は作成する
  if (!rooms.has(roomName)) {
    rooms.set(roomName, new Set());
  }
  
  // このクライアントをルームに追加する
  const room = rooms.get(roomName);
  if(!room) {
    // 起こり得ないはず
    return;
  }


  room.add(ws);
  
  // 切断時の処理
  ws.on('close', () => {
    room.delete(ws);
    console.log(`クライアントがルーム「${roomName}」から切断したのだ！`);
    
    // 空のルームは削除
    if (room.size === 0) {
      rooms.delete(roomName);
      console.log(`ルーム「${roomName}」を削除したのだ！`);
    }
  });
  
  setupWSConnection(ws, req, {
    gcEnabled: true,
    roomName: roomName,
  });
};

