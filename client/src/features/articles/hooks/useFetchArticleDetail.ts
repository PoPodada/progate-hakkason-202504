import axios from "axios";
import { useEffect, useState } from "react";

export interface ArticleDetail {
	id: string;
	title: string;
	subtitle: string;
	label: string[];
	emoji: string;
	githubUrl: string;
	deployUrl: string;
	authors: {
		userId: string;
		name: string;
	}[];
	projectDetail: string;
}

const useArticleDetail = () => {
	const [article, setArticle] = useState<ArticleDetail | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const response = await axios.get<ArticleDetail>("/article.json");
				setArticle(response.data);
			} catch (err) {
				setError(err as Error);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return { article, error, loading };
};

export default useArticleDetail;
