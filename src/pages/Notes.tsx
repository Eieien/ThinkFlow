import {useState, useEffect, useMemo} from "react"
import { useParams } from "react-router-dom"
import GuestHeader from "../components/layout/NavigationBar";
import Layout from "../components/layout/Layout";
import { useEditor, EditorContent, EditorContext, useEditorState } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'



export default function Notes(){
    const {id} = useParams();
    const [value, setValue] = useState("")
    const [isEditable, setEditable] = useState(true);
    const title = "Untitled";

    const editor = useEditor({
        extensions: [StarterKit.configure({
            heading: {
              levels: [1, 2, 3],
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
    
              
    
    // Memoize the provider value to avoid unnecessary re-renders
    const providerValue = useMemo(() => ({ editor }), [editor])

    return(
        <>
            <Layout
                title={id?.toString()}
                description="Wuwa"
            >
                <GuestHeader/>
                <EditorContext.Provider value={providerValue}>
                    <EditorContent editor={editor} />
                    <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
                    <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
                </EditorContext.Provider>
                {id}

            </Layout>
        </>
    )
}