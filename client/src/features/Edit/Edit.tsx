import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TiptapEditor from "@/features/Edit/components/tiptap-editor";
import { X } from "lucide-react";
import { useState } from "react";

type TechStack = {
	id: string;
	name: string;
};

const Edit = () => {
	const [techStack, setTechStack] = useState<TechStack[]>([]);
	const [newTech, setNewTech] = useState("");

	const addTech = () => {
		if (newTech && techStack.length < 5) {
			setTechStack([...techStack, { id: crypto.randomUUID(), name: newTech }]);
			setNewTech("");
		}
	};

	const removeTech = (id: string) => {
		setTechStack(techStack.filter((tech) => tech.id !== id));
	};

	return (
		<div>
			<div className="max-w-2xl mx-auto p-6 space-y-6">
				<div className="space-y-2">
					<label className="text-sm font-medium" htmlFor="title">
						プロジェクトタイトル
					</label>
					<Input
						placeholder="プロジェクトのタイトルを入力してください"
						id="title"
					/>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium" htmlFor="githubUrl">
						GitHub URL
					</label>
					<Input
						placeholder="https://github.com/username/repo"
						id="githubUrl"
					/>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium" htmlFor="deployUrl">
						公開用URL
					</label>
					<Input placeholder="https://your-project.com" id="deployUrl" />
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
						placeholder="プロジェクトの概要を入力してください"
						className="min-h-[150px]"
						id="abstract"
					/>
				</div>
			</div>
			<TiptapEditor />
		</div>
	);
};

export default Edit;
