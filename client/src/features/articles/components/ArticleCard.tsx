import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router";
import type { Articles } from "../hooks/useFetchArticles";

const ArticleCard = ({ id, title, label, emoji, author }: Articles) => {
  return (
    <Link
      key={id}
      to={id}
      className="w-full max-w-xs bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
    >
      <div className="h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
        <span className="text-6xl">{emoji || "📝"}</span>
      </div>
      <div className="px-3 pt-3 pb-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {/* labelが存在する場合のみmap処理を行うのだ */}
          {label && label.length > 0 ? (
            label.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="inline-block bg-cyan-500 text-white text-xs px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="inline-block bg-gray-400 text-white text-xs px-2 py-0.5 rounded-full">
              未分類
            </span>
          )}
        </div>
        <h3 className="text-base font-bold text-gray-800 text-center truncate">
          {title}
        </h3>
        <div className="flex items-center mt-3">
          <Avatar className="shadow border-2 border-cyan-500 object-cover">
            <AvatarImage alt="icon-url" />
            <AvatarFallback>{author ? author.charAt(0) : "?"}</AvatarFallback>
          </Avatar>
          <span className="ml-2 text-sm text-gray-500 truncate">
            {author || "名無しさん"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
