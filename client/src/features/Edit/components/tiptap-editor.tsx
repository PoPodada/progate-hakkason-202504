import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import RichEditorToolbar from "./rich-editor-toolbar";
import "@/styles/editor.scss";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

const fetchUser = async (id: string) => {
	// 本来はAPI呼び出しになる部分
	const mockUsers = [
		{
			id: "1",
			name: "User 1",
		},
		{
			id: "2",
			name: "User 2",
		},
		{
			id: "3",
			name: "User 3",
		},
	];
	return mockUsers[0] || { name: "Anonymous" };
};

// ユニークで見分けやすい10色
const colors = [
	"#e6194b",
	"#3cb44b",
	"#ffe119",
	"#4363d8",
	"#f58231",
	"#911eb4",
	"#46f0f0",
	"#f032e6",
	"#bcf60c",
	"#fabebe",
];

const TiptapEditor = () => {
	const { projectId } = useParams<{ projectId: string }>();
	const [user, setUser] = useState<{ name: string }>({ name: "loading..." });
	const [provider, setProvider] = useState<WebsocketProvider | null>(null);
	const ydoc = useMemo(() => new Y.Doc(), []);

	
	useEffect(() => {
		const loadUser = async () => {
			try {
				const userInfo = await fetchUser("1");
				setUser(userInfo);
			} catch (error) {
				console.error("ユーザー情報の取得に失敗したのだ...", error);
				setUser({ name: "Anonymous" });
			}
		};

		loadUser();
	}, []);
	console.log("user", user);
	console.log("projectId", projectId);
	console.log(provider);

	useEffect(() => {
		if (!projectId) return;
		const newProvider = new WebsocketProvider(
			"ws://127.0.0:1234",
			projectId, //roomname
			ydoc,
		);

		// 接続状態をログ出力するのだ
		newProvider.on("status", (event: { status: string }) => {
			console.log("connection status", event.status);
		});

		setProvider(newProvider);

		return () => {
			newProvider.disconnect();
		};
	}, [projectId, ydoc]);
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				history: false,
			}),
			TaskItem.configure({
				nested: true,
			}),
			TaskList,
			Link.configure({
				openOnClick: true,
			}),
			Placeholder.configure({
				placeholder: "Write something …",
			}),
			Collaboration.configure({ document: ydoc }),
			...(provider && user.name !== "loading..." 
				? [
					CollaborationCursor.configure({
						provider,
						user: {
							name: user.name,
							color: colors[Math.floor(Math.random() * colors.length)], // ランダムな色を使うのだ！
						},
					}),
				] 
				: []
			),
		],
		content: "<p>Hello World! 🌍️</p>",
		editorProps: {
			attributes: {
				class: "prose prose-base m-5 focus:outline-none",
			},
		},
	},[provider, user]);

	if (!editor || !provider) {
		return null;
	}
	return (
		<div className="w-2/3 mt-10 mx-auto border-gray-500 border-2">
			<RichEditorToolbar editor={editor} />
			<div className="p-3 overflow-y-scroll h-[500px] overflow-hidden mt-3">
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};

export default TiptapEditor;
