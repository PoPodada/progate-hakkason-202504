import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// 環境変数を読み込むのだ
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ミドルウェアを設定するのだ
app.use(cors());
app.use(express.json());

// ルートエンドポイントなのだ
app.get("/", (req, res) => {
  res.json({ message: "ずんだもんのAPI サーバーなのだ！🍡" });
});

// サーバーを起動するのだ
app.listen(port, () => {
  console.log(`サーバーが起動したのだ！ポート: ${port} 🍵`);
});
