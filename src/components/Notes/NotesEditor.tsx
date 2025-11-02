import {useState, useEffect, useMemo} from "react";
import { useEditor, EditorContent, EditorContext, useEditorState } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import Typography from '@tiptap/extension-typography';
import { shouldShowHeadingMenu } from "../../configs/HeadingConfig"; 
import { getHierarchicalIndexes, TableOfContents } from '@tiptap/extension-table-of-contents';
import { Highlighter } from "lucide-react";
import Collaboration from "@tiptap/extension-collaboration"
import {HocuspocusProvider} from "@hocuspocus/provider"
import {CollaborationCaret} from '@tiptap/extension-collaboration-caret'
import * as Y from "yjs"
import { generateJSON, } from '@tiptap/html'
import { yXmlFragmentToProseMirrorFragment } from "@tiptap/y-tiptap";


export default function NotesEditor(){

    const [value, setValue] = useState("Welcome to the Simple Editor template! This template integrates open source UI components and Tiptap extensions licensed under MIT.")
    const ydoc = new Y.Doc();

    const provider = new HocuspocusProvider({
        url: "ws://localhost:3000/collab",
        name: "example",
        document: ydoc,
      });

    const [isEditable, setEditable] = useState(true);
    const title = "Antitled";


    const editor = useEditor({
        extensions: [
          Collaboration.configure({
            document: ydoc,
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

          // CollaborationCaret.configure({
          //   provider: provider,
          //   user: {
          //     name: 'Cyndi Lauper',
          //     color: '#f783ac',
          //   },
          // }),
      
        Typography,
        ], // define your extension array
        autofocus: "end",
        
    })

    provider.on('sync', () => {
      if (editor.isEmpty) {
        editor.commands.setContent(value);
      }
    });

    useEffect(() => {

      if (editor) {
          editor.setEditable(isEditable)
        }
      }, [isEditable, editor])
    

    useEffect(() => {
        if (!editor) return
        // Ensure the title always exists when the editor mounts
        const json = editor.getJSON()
        const firstNode = json.content?.[0]
        if (!firstNode || firstNode.type !== 'heading') {
          editor.commands.insertContentAt({ from: 0, to: 0 }, {
            type: 'heading',
            attrs: { level: 1 },
            content: [{ type: 'text', text: '' }],
          })
        }
      }, [editor])
      

    // Memoize the provider value to avoid unnecessary re-renders
    const providerValue = useMemo(() => ({ editor }), [editor]);

    return (
    <>
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
        shouldShow={() => editor.isActive('highlight')}
        >
            <div className="p-2 rounded-md bg-primary-white border border-light-border z-20">
            <p className="text-xs">
                Highlight
            </p>
            <div className="mt-1 flex gap-1">
                <button
                onClick={() => editor.chain().focus().toggleHighlight({color: "#492AE5"}).run()}
                className="p-2 bg-light-primary-blue transition rounded-full"
                type="button"
                >
                </button>
                <button
                onClick={() => editor.chain().focus().toggleHighlight({color: "#492AE5"}).run()}
                className="p-2 bg-light-primary-blue transition rounded-full"
                type="button"
                >
                </button>
                <button
                onClick={() => editor.chain().focus().toggleHighlight({color: "#492AE5"}).run()}
                className="p-2 bg-light-primary-blue transition rounded-full"
                type="button"
                >
                </button>
                <button
                onClick={() => editor.chain().focus().toggleHighlight({color: "#492AE5"}).run()}
                className="p-2 bg-light-primary-blue transition rounded-full"
                type="button"
                >
                </button>

            </div>


            </div>
        
        </BubbleMenu>
    </EditorContext.Provider>
    </>
    )
}