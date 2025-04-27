import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import remarkGfm from "remark-gfm";
import githubIcon from "../../../assets/github-mark-white.svg";
import useArticleDetail from "../hooks/useFetchArticleDetail";

export default function ArticleDetail() {
	const { article, loading } = useArticleDetail();

	if (loading) {
		return <div className="text-center mt-20">読み込み中...</div>;
	}
	if (!article) {
		return <div className="text-center mt-20">Post Not Found:(</div>;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-4 py-8 max-w-5xl">
				{/* ヘッダー部分 */}
				<div className="px-8 pt-12 pb-10">
					<div className="text-7xl text-center mb-8">{article.emoji}</div>
					<h1 className="text-3xl font-bold text-center mb-4">
						{article.title}
					</h1>
					<p className="text-gray-600 text-center text-lg mb-10">
						{article.subtitle}
					</p>

					{/* 技術スタック */}
					<div className="flex flex-wrap justify-center gap-2 mb-10">
						{article.label.map((tech) => (
							<span
								key={tech}
								className="shadow-sm bg-white text-gray-800 px-4 py-1.5 rounded-full text-sm font-medium"
							>
								{tech}
							</span>
						))}
					</div>

					{/* リンク */}
					<div className="flex justify-center gap-4">
						<Link
							to={article.githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 bg-[#24292F] text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
						>
							<img src={githubIcon} alt="GitHub" className="w-5 h-5" />
							<span>GitHubを見る</span>
						</Link>
						<Link
							to={article.deployUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 bg-white border border-gray-300 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
						>
							<span>デプロイ先を見る</span>
						</Link>
					</div>
				</div>

				{/* メンバー部分 */}
				<div className="px-8 py-6 bg-gray-50 border-y">
					<h2 className="font-semibold text-gray-900 mb-4">開発メンバー</h2>
					<div className="flex flex-wrap gap-3">
						{article.authors.map((author) => (
							<div
								key={author.userId}
								className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border shadow-sm"
							>
								<Avatar className="h-6 w-6">
									<AvatarImage src={author.userId} />
									<AvatarFallback>{author.name[0]}</AvatarFallback>
								</Avatar>
								<span className="text-gray-700 text-sm font-medium">
									{author.name}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* プロジェクト詳細 */}
				<div className="px-8 py-6 prose lg:prose-sm">
					<ReactMarkdown remarkPlugins={[remarkGfm]}>
						{article.projectDetail}
					</ReactMarkdown>
				</div>
			</div>
		</div>
	);
}
