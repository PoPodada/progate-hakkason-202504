import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./firebase";

// 環境変数を読み込むのだ
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ミドルウェアを設定するのだ
app.use(cors());
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

// 記事一覧を取得するエンドポイントなのだ！
app.get("/api/articles", async (req, res) => {
  try {
    const articlesSnapshot = await db.collection("articles").get();
    const articles: Array<{id: string; [key: string]: any}> = [];
    
    articlesSnapshot.forEach((doc) => {
      articles.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.json(articles);
  } catch (error) {
    console.error("記事データの取得に失敗したのだ...😭", error);
    res.status(500).json({ error: "記事データの取得に失敗したのだ" });
  }
});

// サーバーを起動するのだ
app.listen(port, () => {
  console.log(`サーバーが起動したのだ！ポート: ${port} 🍵`);
  testFirebaseConnection();
});
