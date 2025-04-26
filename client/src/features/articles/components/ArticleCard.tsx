import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router";
import type { Articles } from "../hooks/useFetchArticles";

const TopazCard = ({ id, title, category, imageUrl, author }: Articles) => {
	return (
		<Link
			key={id}
			to={id}
			className="w-full max-w-xs bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
		>
			<div className="h-48 w-full overflow-hidden">
				<img
					src={imageUrl}
					alt="プロジェクト画像"
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="px-3 pt-3 pb-4">
				<span className="inline-block bg-cyan-500 text-white text-xs px-2 py-0.5 rounded-full mb-2">
					{category}
				</span>
				<h3 className="text-base font-bold text-gray-800 text-center truncate">
					{title}
				</h3>
				<div className="flex items-center mt-3">
					<Avatar className="shadow border-2 border-cyan-500 object-cover">
						<AvatarImage alt="icon-url" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<span className="ml-2 text-sm text-gray-500 truncate">
						{author.name}
					</span>
				</div>
			</div>
		</Link>
	);
};

export default TopazCard;
