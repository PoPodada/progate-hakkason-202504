import { type User, onAuthStateChanged } from "firebase/auth";

import { collection, getDocs } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { create } from "zustand";
import Articles from "./features/articles/pages/ArticlesPage";
import { auth, db } from "./firebase";

type AuthStore = {
	user: User | null;
	loading: boolean;
	setUser: (user: User | null) => void;
	setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	loading: true,
	setUser: (user) => set({ user }),
	setLoading: (loading) => set({ loading }),
}));

function App() {
	// 認証状態を保持するための状態変数なのだ！
	// const [user, setUser] = useState<User | null>(null);
	// const [loading, setLoading] = useState(true);
	const { setUser, setLoading, user, loading } = useAuthStore();
	console.log("user", user?.displayName);

	// Firebase接続テスト関数をuseCallbackでメモ化するのだ！
	const testFirebaseConnection = useCallback(async () => {
		try {
			console.log("Firebaseに接続を試みるのだ...");
			const querySnapshot = await getDocs(collection(db, "test-collection"));
			console.log("Firebase接続成功なのだ！🎉");

			// forEachの代わりにfor...ofを使うのだ！パフォーマンスが良くなるのだ🍵
			for (const doc of querySnapshot.docs) {
				console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
			}
		} catch (error) {
			console.error("Firebase接続エラーなのだ...😭", error);
		}
	}, []); // 依存配列は空なのだ

	// ユーザーの認証状態を監視するのだ！
	useEffect(() => {
		// onAuthStateChangedはユーザーのログイン状態が変わるたびに呼ばれるのだ
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser); // ログインしていればユーザー情報、していなければnullが入るのだ
			setLoading(false); // 読み込み完了なのだ

			console.log(
				currentUser
					? `ログイン中のユーザー: ${currentUser.email}なのだ！`
					: "ログインしていないのだ！",
			);
		});

		// コンポーネントのクリーンアップ時にリスナーを解除するのだ
		// これはメモリリークを防ぐために重要なのだ！🌿
		return () => unsubscribe();
	}, [setUser, setLoading]); // 依存配列は空なのだ

	// コンポーネントがマウントされたときに接続テストを実行するのだ
	useEffect(() => {
		testFirebaseConnection();
	}, [testFirebaseConnection]); // 依存配列にtestFirebaseConnectionを追加するのだ！

	return <Articles />;
}

export default App;
