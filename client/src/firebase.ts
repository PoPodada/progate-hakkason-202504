// Firebase設定のインポートなのだ
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebaseの設定なのだ
// この設定情報はFirebase Consoleから取得したものを貼り付けるのだ！
const firebaseConfig = {
	apiKey: "AIzaSyDuNhHUXB4NGDPMmzxo0VxGFiRX-6XI0Yg",
	authDomain: "progate-hakkason-202504.firebaseapp.com",
	projectId: "progate-hakkason-202504",
	storageBucket: "progate-hakkason-202504.firebasestorage.app",
	messagingSenderId: "737311161772",
	appId: "1:737311161772:web:d7dd1a0cebd4e29404ce09",
	measurementId: "G-6LGY21DS4Y",
};

// Firebaseの初期化なのだ
const app = initializeApp(firebaseConfig);

// 必要なサービスをエクスポートするのだ
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
