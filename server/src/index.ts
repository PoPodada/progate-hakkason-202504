import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./firebase";
import http from 'http';
import { handleWebSocketConnection } from "./controller/websocket";
const WebSocket = require("ws");


// 環境変数を読み込むのだ
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ミドルウェアを設定するのだ
app.use(cors({
  origin: process.env.CliENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// Firebase接続テスト関数なのだ！
const testFirebaseConnection = async () => {
  try {
    console.log("サーバー側からFirebaseに接続を試みるのだ...");
    const snapshot = await db.collection("test-collection").get();
    console.log("Firebase Admin 接続成功なのだ！🎉");
    snapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  } catch (error) {
    console.error("Firebase Admin 接続エラーなのだ...😭", error);
  }
};

// ルートエンドポイントなのだ
app.get("/", (req, res) => {
  res.json({ message: "ずんだもんのAPI サーバーなのだ！🍡" });
});

// WebSocket接続の処理
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
wss.on("connection", handleWebSocketConnection);

server.listen(port, () => {
  console.log(`サーバーが起動したのだ！ポート: ${port} 🍵`);
  testFirebaseConnection();
});