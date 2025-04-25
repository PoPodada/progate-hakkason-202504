import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import dotenv from "dotenv";

// 環境変数を読み込むのだ！
dotenv.config();

// サービスアカウントキーはFirebase Consoleからダウンロードしたものを使うのだ
// 実際のプロジェクトでは環境変数などで管理した方が良いのだ！
try {
  // すでに初期化されているか確認するのだ
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      } as ServiceAccount),
    });
  }
} catch (error) {
  console.error("Firebase admin initialization error", error);
}

// Firebaseの管理機能をエクスポートするのだ
export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();

export default admin;
