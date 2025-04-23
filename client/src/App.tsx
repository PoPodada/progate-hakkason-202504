import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "./firebase";

function App() {
	// Firebase接続テスト関数なのだ！
	const testFirebaseConnection = async () => {
		try {
			console.log("Firebaseに接続を試みるのだ...");
			const querySnapshot = await getDocs(collection(db, "test-collection"));
			console.log("Firebase接続成功なのだ！🎉");
			querySnapshot.forEach((doc) => {
				console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
			});
		} catch (error) {
			console.error("Firebase接続エラーなのだ...😭", error);
		}
	};

	// コンポーネントがマウントされたときに接続テストを実行するのだ
	useEffect(() => {
		testFirebaseConnection();
	}, []);

	return <div className="font-bold">test</div>;
}

export default App;
