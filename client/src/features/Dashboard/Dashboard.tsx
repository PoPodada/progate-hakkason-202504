import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type Project = {
	id: string;
	title: string;
	technologies: string[];
	status: "private" | "public" | "draft";
	createdAt: string;
};

// APIモックデータを取得する関数
const fetchProjects = async (): Promise<Project[]> => {
	// APIモックデータ
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: "1",
					title: "共同編集機能付きメモアプリ",
					technologies: [
						"React",
						"TypeScript",
						"Firebase",
						"TipTap",
						"Tailwind",
					],
					status: "public",
					createdAt: "2024.04.27",
				},
				{
					id: "2",
					title: "AIチャットボット",
					technologies: ["Next.js", "OpenAI"],
					status: "private",
					createdAt: "2024.04.26",
				},
				{
					id: "3",
					title: "ポートフォリオサイト",
					technologies: ["React", "Tailwind"],
					status: "draft",
					createdAt: "2024.04.25",
				},
			]);
		}, 1000);
	});
};

const Dashboard = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const loadProjects = async () => {
			const data = await fetchProjects();
			setProjects(data);
			setLoading(false);
		};
		loadProjects();
	}, []);

	const getStatusColor = (status: Project["status"]) => {
		switch (status) {
			case "public":
				return "bg-cyan-100 text-cyan-800"; // 水色に変更
			case "private":
				return "bg-yellow-100 text-yellow-800"; // 非公開は黄色のまま
			case "draft":
				return "bg-red-100 text-red-800"; // 下書きは赤色に変更
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6">記事一覧</h1>
			<div className="space-y-4">
				{projects.map((project) => (
					<Card key={project.id} className="relative">
						<CardHeader className="pb-2">
							<div className="flex justify-between items-start">
								<div className="space-y-2">
									<h2 className="text-xl font-semibold">{project.title}</h2>
									<div className="flex gap-2 flex-wrap">
										{project.technologies.map((tech) => (
											<Badge key={tech} variant="secondary">
												{tech}
											</Badge>
										))}
									</div>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className="flex  items-center justify-between">
								<div>
									<Badge className={`${getStatusColor(project.status)} mr-2`}>
										{project.status === "public"
											? "公開"
											: project.status === "private"
												? "非公開"
												: "下書き"}
									</Badge>
									<span className="text-sm text-gray-500">
										{project.createdAt}
									</span>
								</div>
								<div className="flex">
									<Button
										variant="ghost"
										size="icon"
										className="border w-20 mr-4"
										onClick={() => {
											navigate(`/projects/${project.id}/edit`);
										}}
									>
										{/* <Edit className="h-4 w-4" /> */}
										編集
									</Button>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon">
												<MoreVertical className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem className="gap-2">
												<UserPlus className="h-4 w-4" />
												招待する
											</DropdownMenuItem>
											<DropdownMenuItem className="gap-2 text-red-600">
												<Trash2 className="h-4 w-4" />
												削除する
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Dashboard;
