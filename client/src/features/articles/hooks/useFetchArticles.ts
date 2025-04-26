import axios from "axios";
import { useEffect, useState } from "react";

export interface Articles {
	id: string;
	title: string;
	category: string;
	imageUrl: string;
	author: {
		name: string;
		avatarUrl: string;
	};
}

export const useFetchArticles = () => {
	const [articles, setArticles] = useState<Articles[]>([]);
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const response = await axios.get<Articles[]>("/articles.json");
				setArticles(response.data);
			} catch (err) {
				setError(err as Error);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return { articles, error, loading };
};
