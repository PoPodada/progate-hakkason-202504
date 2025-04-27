import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TiptapEditor from "@/features/Edit/components/tiptap-editor";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { useParams } from "react-router";

type TechStack = {
	id: string;
	name: string;
};

const Edit = () => {
	const [title, setTitle] = useState("");
	const [subtitle, setSubtitle] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [githubUrl, setGithubUrl] = useState("");
	const [deployUrl, setDeployUrl] = useState("");
	const [techStack, setTechStack] = useState<TechStack[]>([]);
	const [newTech, setNewTech] = useState("");
	const editorRef = useRef(null);
	const { projectId } = useParams<{ projectId: string }>();

	const handleSubmit = async () => {
		if (!editorRef.current) {
			console.error("エディターの参照が取得できないのだ...");
			return;
		}

		try {
			const projectDetail = editorRef.current.getHTML();

			const requestBody = {
				id: projectId, // URLパラメータから取得したIDを使うのだ
				title,
				subtitle,
				label: techStack.map((tech) => tech.name),
				imageUrl,
				githubUrl,
				deployUrl,
				projectDetail,
			};
			console.log(requestBody);

			// const response = await fetch("/api/projects", {
			// 	method: "POST",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify(requestBody),
			// });

			// if (!response.ok) {
			// 	throw new Error("APIリクエストが失敗したのだ...");
			// }

			console.log("プロジェクトが保存できたのだ！🎉");
			// 保存成功後の処理（例：一覧ページへの遷移）
		} catch (error) {
			console.error("保存中にエラーが発生したのだ...", error);
		}
	};

	const addTech = () => {
		if (newTech && techStack.length < 5) {
			setTechStack([...techStack, { id: crypto.randomUUID(), name: newTech }]);
			setNewTech("");
		}
	};

	const removeTech = (id: string) => {
		setTechStack(techStack.filter((tech) => tech.id !== id));
	};

	// const getEditorContent = () => {
	// 	// Access the ydoc from the editor component via ref
	// 	if (editorRef.current) {
	// 		const editor = editorRef.current;
	// 		const htmlContent = editor.getHTML();
	// 		const textContent = editor.getText();

	// 		console.log("Editor HTML content:", htmlContent);
	// 		console.log("Editor text content:", textContent);
	// 	} else {
	// 		console.log("Editor reference not available");
	// 	}
	// };

	return (
		<div>
			<div className="max-w-2xl mx-auto p-6 space-y-6">
				<div className="space-y-2">
					<label className="text-sm font-medium" htmlFor="title">
						プロジェクトタイトル
					</label>
					<Input
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="プロジェクトのタイトルを入力してください"
					/>
				</div>
				<div className="space-y-2">
					<label className="text-sm font-medium" htmlFor="githubUrl">
						GitHub URL
					</label>
					<Input
						id="githubUrl"
						value={githubUrl}
						onChange={(e) => setGithubUrl(e.target.value)}
						placeholder="https://github.com/username/repo"
					/>
				</div>
				<div className="space-y-2">
					<label className="text-sm font-medium" htmlFor="deployUrl">
						公開用URL
					</label>
					<Input
						id="deployUrl"
						value={deployUrl}
						onChange={(e) => setDeployUrl(e.target.value)}
						placeholder="https://your-project.com"
					/>
				</div>
				<div className="space-y-2">
					<label className="text-sm font-medium" htmlFor="technology-used">
						使用技術（最大5つ）
					</label>
					<div className="flex gap-2 flex-wrap mb-2">
						{techStack.map((tech) => (
							<Badge key={tech.id} variant="secondary" className="px-3 py-1">
								{tech.name}
								<button
									onClick={() => removeTech(tech.id)}
									className="ml-2 hover:text-destructive"
									type="button"
								>
									<X size={14} />
								</button>
							</Badge>
						))}
					</div>
					<div className="flex gap-2">
						<Input
							value={newTech}
							onChange={(e) => setNewTech(e.target.value)}
							placeholder="技術名を入力"
							disabled={techStack.length >= 5}
						/>
						<Button
							onClick={addTech}
							disabled={!newTech || techStack.length >= 5}
						>
							追加
						</Button>
					</div>
				</div>
				<div className="space-y-2">
					<label className="text-sm font-medium" htmlFor="abstract">
						概要
					</label>
					<Textarea
						id="abstract"
						value={subtitle}
						onChange={(e) => setSubtitle(e.target.value)}
						placeholder="プロジェクトの概要を入力してください"
						className="min-h-[150px]"
					/>
				</div>
				<div className="space-y-2">
					<TiptapEditor ref={editorRef} />
				</div>
				{/* <Button onClick={getEditorContent} className="mt-4">
					エディタの内容を取得
				</Button> */}
			</div>
			<Button onClick={handleSubmit}>更新</Button>
		</div>
	);
};

export default Edit;
