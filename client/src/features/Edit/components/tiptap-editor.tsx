import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import RichEditorToolbar from "./rich-editor-toolbar";
import "@/styles/editor.scss";
import { useAuthStore } from "@/App";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

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
	const { user } = useAuthStore();
	const { projectId } = useParams<{ projectId: string }>();
	const [provider, setProvider] = useState<WebsocketProvider | null>(null);
	const ydoc = useMemo(() => new Y.Doc(), []);
	console.log("user", user);

	useEffect(() => {
		console.log("TiptapEditor: user state changed", {
			displayName: user?.displayName,
			email: user?.email,
			uid: user?.uid,
		});
	}, [user]);

	useEffect(() => {
		if (!projectId) return;
		const newProvider = new WebsocketProvider(
			"ws://localhost:3000",
			projectId, //roomname
			ydoc,
		);

		setProvider(newProvider);

		return () => {
			newProvider.disconnect();
		};
	}, [projectId, ydoc]);
	const editor = useEditor(
		{
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
				...(provider
					? [
							CollaborationCursor.configure({
								provider,
								user: {
									name:
										user?.displayName === null
											? "Anonymous"
											: user?.displayName,
									color: colors[Math.floor(Math.random() * colors.length)], // ランダムな色を使うのだ！
								},
							}),
						]
					: []),
			],
			content: "<p>Hello World! 🌍️</p>",
			editorProps: {
				attributes: {
					class: "prose prose-base m-5 focus:outline-none",
				},
			},
		},
		[provider, user],
	);

	if (!editor || !provider) {
		return null;
	}
	return (
		<div className=" mt-10 mx-auto border-gray-500 border-2">
			<RichEditorToolbar editor={editor} />
			<div className="p-3 overflow-y-scroll h-[500px] overflow-hidden mt-3">
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};

export default TiptapEditor;
