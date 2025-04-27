import { useAuthStore } from "@/App";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { FileText, LogOut, Settings, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Header = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const { user } = useAuthStore();
	const navigate = useNavigate();

	const closeModal = () => {
		setModalOpen(false);
	};

	const handleLogout = async () => {
		try {
			await signOut(auth);
			console.log("ログアウト成功なのだ！🍵");
		} catch (error) {
			console.error("ログアウトに失敗したのだ...😭", error);
		}
	};

	const renderAuthButtons = () => {
		if (user) {
			return (
				<div className="flex items-center gap-4">
					<Button
						variant="default"
						className="bg-cyan-500 hover:bg-cyan-600"
						onClick={() => setModalOpen(true)}
					>
						投稿
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Avatar className="cursor-pointer shadow hover:opacity-80">
								<AvatarImage
									src={user?.photoURL || ""}
									alt="プロフィール画像"
								/>
								<AvatarFallback>{user?.displayName?.[0] || "U"}</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-48" align="end">
							<DropdownMenuItem onClick={() => {}}>
								<User className="mr-2 h-4 w-4" />
								マイページ
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => navigate("/dashboard")}>
								<FileText className="mr-2 h-4 w-4" />
								記事一覧
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => {}}>
								<Settings className="mr-2 h-4 w-4" />
								設定
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="text-red-600 focus:text-red-600"
								onClick={handleLogout}
							>
								<LogOut className="mr-2 h-4 w-4" />
								ログアウト
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		}

		return (
			<div className="flex items-center gap-4">
				<Button
					variant="outline"
					className="text-gray-700 hover:bg-gray-100"
					onClick={() => navigate("/login")}
				>
					ログイン
				</Button>
				<Button
					variant="default"
					className="bg-cyan-500 hover:bg-cyan-600"
					onClick={() => navigate("/signup")}
				>
					新規登録
				</Button>
			</div>
		);
	};

	return (
		<header className="bg-white shadow z-10">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<h1 className="font-bold text-xl text-gray-800">
					<Link to="/">ネオTopa'z</Link>
				</h1>
				{renderAuthButtons()}
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
						className="font-black px-4 py-2 text-black bg-white rounded-lg hover:bg-gray-400 transition w-[240px] h-[280px] z-20"
						style={{ boxShadow: "0 4px 20px rgba(255,255,255,0.5" }}
						onClick={(e) => {
							e.stopPropagation();
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
