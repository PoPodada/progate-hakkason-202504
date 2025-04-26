import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router";

const Header = () => {
	const [modalOpen, setModalOpen] = useState(false);

	const closeModal = () => {
		setModalOpen(false);
	};

	return (
		<header className="bg-white shadow">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<h1 className="font-bold text-xl text-gray-800"><Link to="/">Logo</Link></h1>
				<div className="flex ">
					<Button
						variant={"default"}
						className="mr-4"
						onClick={() => setModalOpen(true)}
					>
						投稿
					</Button>
					<Avatar className="shadow">
						<AvatarImage alt="icon-url" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</div>
			</div>
			{modalOpen && (
				<div
					className="fixed inset-0 bg-gray-950/30 flex items-center justify-center z-10"
					onClick={closeModal}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							closeModal();
						}
					}}
				>
					<Button
						className="font-black px-4 py-2 text-black bg-white rounded-lg hover:bg-gray-400 transition w-[240px] h-[280px]  z-20"
						style={{ boxShadow: "0 4px 20px rgba(255,255,255,0.5" }}
						onClick={(e) => {
							console.log("プロジェクト作成画面");
						}}
					>
						<div>
							<p>プロジェクトを作成</p>
							<p>プロジェクトを作ったら投稿してみよう！</p>
						</div>
					</Button>
				</div>
			)}
		</header>
	);
};

export default Header;
