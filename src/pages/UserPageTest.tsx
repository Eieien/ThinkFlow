import react from "react"
import Layout from "../components/layout/Layout"
import Sidebar from "../components/layout/Sidebar"
export default function UserPageTest(){

    return(
        <>
            <Layout
                title="User page"
                description="test"
            >
                <Sidebar/>

            </Layout>
        </>

    )
    
}