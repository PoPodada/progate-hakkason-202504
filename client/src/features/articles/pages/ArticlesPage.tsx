import ArticleCard from "../components/ArticleCard";
import { useFetchArticles } from "../hooks/useFetchArticles";

export default function Articles() {
	const { articles, loading } = useFetchArticles();
	if (loading) {
		return <div className="text-center mt-20">読み込み中...</div>;
	}
	if (!articles || articles.length === 0) {
		return <>Post Not Found:(</>;
	}
	return (
		<div className="py-16 px-4">
			<h2 className="text-xl sm:text-2xl font-semibold text-gray-800 tracking-tight text-center">
				最新のプロジェクト
			</h2>
			<div className="flex justify-center mb-6 mt-2">
				<span className="block h-1 mb-6 w-16 bg-cyan-500 rounded-full" />
			</div>

			<div className="max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
				{articles.map((article) => (
					<ArticleCard key={article.id} {...article} />
				))}
			</div>
		</div>
	);
}
