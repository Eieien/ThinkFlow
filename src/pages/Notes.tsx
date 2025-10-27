import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import GuestHeader from "../components/layout/NavigationBar";
import Layout from "../components/layout/Layout";
import MDEditor, {selectWord} from "@uiw/react-md-editor";
import { MDXEditor, headingsPlugin, diffSourcePlugin, markdownShortcutPlugin, toolbarPlugin, DiffSourceToggleWrapper } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'


export default function Notes(){
    const {id} = useParams();
    const [value, setValue] = useState("**Hello World!**")
    return(
        <>
            <Layout
                title={id?.toString()}
                description="Wuwa"
            >
                <GuestHeader/>
                <div>
                    <MDEditor className="bg-primary-white" height={200} value={value} hideToolbar={true} onChange={setValue}/>
                    {/* <MDXEditor
                    markdown={value}
                    plugins={[
                        toolbarPlugin({
                            toolbarContents: () => (
                                <>
                                  <DiffSourceToggleWrapper />
                                </>
                              )
                    
                        }),
                        diffSourcePlugin({viewMode: 'rich-text'}),
                        headingsPlugin(),
                        markdownShortcutPlugin()]
                    }
                    /> */}
                </div>
                {id}

            </Layout>
        </>
    )
}