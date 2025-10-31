import react, {useState, useEffect} from "react"
import UserLayout from "../components/layout/UserLayout"
import NotesEditor from "../components/Notes/NotesEditor"

export default function UserPageTest(){


    return(
        <>
            <UserLayout
                title="test"
                description="testing sidebar"
                >
                    <NotesEditor/>
               

            </UserLayout>
        </>

    )
    
}