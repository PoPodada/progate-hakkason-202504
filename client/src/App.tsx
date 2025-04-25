import { collection, getDocs } from "firebase/firestore";
import { useCallback, useEffect } from "react";
import { db } from "./firebase";

function App() {
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

	// コンポーネントがマウントされたときに接続テストを実行するのだ
	useEffect(() => {
		testFirebaseConnection();
	}, [testFirebaseConnection]); // 依存配列にtestFirebaseConnectionを追加するのだ！

	return <div className="font-bold">test</div>;
}

export default App;
