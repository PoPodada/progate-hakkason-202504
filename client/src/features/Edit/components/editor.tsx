import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import RichEditorToolbar from "./rich-editor-toolbar";
import "@/styles/editor.scss";
import * as Y from 'yjs'
import { WebsocketProvider } from "y-websocket";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { useEffect } from "react";

const ydoc = new Y.Doc()

const provider = new WebsocketProvider(
    "ws://127.0.0.1:1234",
    "1",
    ydoc
)

const Editor = () => {
    console.log(provider)
    

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
            Collaboration.configure({document: ydoc}),
            CollaborationCursor.configure({
                provider,
                user: {
                  name: "Cyandi Laupter",
                  color: "#ffcc00",
                },
              }),
		],
		content: "<p>Hello World! 🌍️</p>",
		editorProps: {
			attributes: {
				class: "prose prose-base m-5 focus:outline-none",
			},
		},
	});

    useEffect(() => {
        if (provider.shouldConnect) {
            provider.disconnect()
          } else {
            provider.connect()
          }
    },[])

	if (!editor) {
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

export default Editor;
