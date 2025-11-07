import {useState, useEffect, useMemo} from "react";
import { useEditor, EditorContent, EditorContext, useEditorState, type JSONContent } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import Typography from '@tiptap/extension-typography'
import Image from '@tiptap/extension-image'
import { shouldShowHeadingMenu } from "../../configs/HeadingConfig"; 
import { getHierarchicalIndexes, TableOfContents } from '@tiptap/extension-table-of-contents';
import { Bold, ChevronDown, Highlighter, Italic, List, TextQuote, Underline } from "lucide-react";
import Collaboration from "@tiptap/extension-collaboration"
import {Color, TextStyle} from "@tiptap/extension-text-style"
import {HocuspocusProvider} from "@hocuspocus/provider"
import {CollaborationCaret} from '@tiptap/extension-collaboration-caret'
import * as Y from "yjs"
import { generateJSON, } from '@tiptap/html'
import { TiptapTransformer } from "@hocuspocus/transformer";
import axios from "axios";

interface NotesEditorProps{
  data?: String;
  file?: String;
}

export default function NotesEditor({data, file} : NotesEditorProps){

    // html imported from database
    // const datad = `
    //   <h1>Untitled</h1>
    //   <p>Welcome to the Simple Editor template! This template integrates open source UI components and Tiptap extensions licensed under MIT.</p>
    // `;
    

    // HTML to prosemirror JSON
    // Or we can just send JSON directly without setting html
    const dataJSON : JSONContent = generateJSON(data, [StarterKit]);
    
    const ydoc = TiptapTransformer.toYdoc(
      dataJSON, //JSON
      "default",
      [StarterKit]
    );
    console.log("Generated JSON");
    console.log(file);
    const provider = new HocuspocusProvider({
        url: "ws://localhost:3000/collab",
        name: "README.md",
        document: ydoc,
      });

    const [isEditable, setEditable] = useState(true);


    const editor = useEditor({
        extensions: [
          Collaboration.configure({
            document: provider?.document,
          }),
          StarterKit.configure({
            heading: {
              levels: [1, 2, 3, 4],
            },
            history: false,
          }),
          Highlight.configure({
          multicolor: true,
          }),
          Image,
          Typography,
          TextStyle,
          Color,
        ], 
        autofocus: "end",
        
    })


    // provider.on("sync", onSync);
    provider.on("sync", () => {
        console.log("Synced");
        // editor.commands.setContent(dataJSON);
    })
      
    useEffect(() => {

      if (editor) {
          editor.setEditable(isEditable)
        }
      }, [isEditable, editor])
    

    // useEffect(() => {
    //     if (!editor) return
    //     // Ensure the title always exists when the editor mounts
    //     const json = editor.getJSON()
    //     const firstNode = json.content?.[0]
    //     if (!firstNode || firstNode.type !== 'heading') {
    //       editor.commands.insertContentAt({ from: 0, to: 0 }, {
    //         type: 'heading',
    //         attrs: { level: 1 },
    //         content: [{ type: 'text', text: '' }],
    //       })
    //     }
    //   }, [editor])
      

    // Memoize the provider value to avoid unnecessary re-renders
    const providerValue = useMemo(() => ({ editor }), [editor]);
    
    const editorState = useEditorState({
      editor,
      selector: ctx => {
        return {
          color: ctx.editor.getAttributes('textStyle').color,
          isPurple: ctx.editor.isActive('textStyle', { color: '#958DF1' }),
          isRed: ctx.editor.isActive('textStyle', { color: '#F98181' }),
          isOrange: ctx.editor.isActive('textStyle', { color: '#FBBC88' }),
          isYellow: ctx.editor.isActive('textStyle', { color: '#FAF594' }),
          isBlue: ctx.editor.isActive('textStyle', { color: '#70CFF8' }),
          isTeal: ctx.editor.isActive('textStyle', { color: '#94FADB' }),
          isGreen: ctx.editor.isActive('textStyle', { color: '#B9F18D' }),
        }
      },
    })
    return (
    <>
    {/* <div className="border border-light-border rounded-md p-2">
      
    </div> */}
    <EditorContext.Provider value={providerValue}>
        <EditorContent editor={editor} />
        <FloatingMenu 
        editor={editor}
        shouldShow={({ editor }) => shouldShowHeadingMenu({ editor }, 1)}
        >
        Heading 1
        </FloatingMenu>
        <FloatingMenu 
        editor={editor}
        shouldShow={({ editor }) => shouldShowHeadingMenu({ editor }, 2)}
        >
        Heading 2
        </FloatingMenu>
        <FloatingMenu 
        editor={editor}
        shouldShow={({ editor }) => shouldShowHeadingMenu({ editor }, 3)}
        >
        Heading 3
        </FloatingMenu>
        <FloatingMenu 
        editor={editor}
        shouldShow={({ editor }) => shouldShowHeadingMenu({ editor }, 4)}
        >
        Heading 4
        </FloatingMenu>
        
        <BubbleMenu 
        editor={editor}
        >
            <div className="rounded-sm bg-primary-white border border-light-border z-20">
            <div className="mt-1 flex">
                <button
                className="editor-icon flex items-center">
                  <input 
                  className="rounded-full w-5 h-5"
                  type="color"
                  onInput={event => editor.chain().focus().setColor(event.currentTarget.value).run()}
                  value={editorState.color}
                  />
                  <ChevronDown/>
                </button>
                <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className="editor-icon"
                type="button"
                >
                  <Bold/>
                </button>
                <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className="editor-icon"
                type="button"
                >
                  <Italic/>
                </button>
                <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className="editor-icon"
                type="button"
                >
                  <Underline/>
                </button>
                <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className="editor-icon"
                type="button"
                >
                  <List/>
                </button>
                <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className="editor-icon"
                type="button"
                >
                  <TextQuote/>
                </button>
                

            </div>


            </div>
        
        </BubbleMenu>
    </EditorContext.Provider>
    </>
    )
}