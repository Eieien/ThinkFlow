import {useState, useEffect, useMemo} from "react"
import { useParams } from "react-router-dom"
import GuestHeader from "../components/layout/NavigationBar";
import Layout from "../components/layout/Layout";
import { useEditor, EditorContent, EditorContext, useEditorState } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { shouldShowHeadingMenu } from "../configs/HeadingConfig"; 


export default function Notes(){
    const {id} = useParams();
    const [value, setValue] = useState("Welcome to the Simple Editor template! This template integrates open source UI components and Tiptap extensions licensed under MIT.")
    const [isEditable, setEditable] = useState(true);
    const title = "Untitled";

    const editor = useEditor({
        extensions: [StarterKit.configure({
            heading: {
              levels: [1, 2, 3, 4],
            },
          }),], // define your extension array
        autofocus: "end",
        content: `<h1>${title}</h1>
                <p>${value}</p>`, // initial content
    })

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
      
    const [floatingHeading, setFloatingHeading] = useState("Heading");

    // Memoize the provider value to avoid unnecessary re-renders
    const providerValue = useMemo(() => ({ editor }), [editor]);

    return(
        <>
            <Layout
                title={id?.toString()}
                description="Wuwa"
            >
                <GuestHeader/>
                <div className="max-w-2xl mx-auto">
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
                        <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
                    </EditorContext.Provider>

                </div>

            </Layout>
        </>
    )
}