import axios from "axios";
import { useEffect, useState } from "react";

// APIのベースURLを設定するのだ
const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export interface Articles {
	id: string;
	title: string;
	label: string[];
	emoji: string;
	author: string;
}

export const useFetchArticles = () => {
	const [articles, setArticles] = useState<Articles[]>([]);
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				// バックエンドAPIから記事データを取得するのだ！
				const response = await axios.get<Articles[]>(
					`${API_BASE_URL}/api/articles`,
				);
				setArticles(response.data);
			} catch (err) {
				console.error("記事の取得に失敗したのだ😭", err);
				setError(err as Error);

				// 開発中はエラー時にローカルJSONから取得するフォールバック機能を追加するのだ
				try {
					const fallbackResponse =
						await axios.get<Articles[]>("/articles.json");
					setArticles(fallbackResponse.data);
					console.log("フォールバック：ローカルJSONから記事を取得したのだ🍵");
				} catch (fallbackErr) {
					console.error("フォールバックの取得にも失敗したのだ💦", fallbackErr);
				}
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return { articles, error, loading };
};
