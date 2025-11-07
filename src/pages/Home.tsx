import react, {useState, useEffect} from "react"
import UserLayout from "../components/layout/UserLayout"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    useEffect(() => {
        async function getNotes(){
            try {
                const res = await axiosPrivate.get('/notes');
                console.log(res.data);
            } catch (err) {
                if(err instanceof AxiosError){
                    console.log(err?.response?.data);
                } else {
                    console.log(err);
                }
            }
        }
        getNotes();
    }, []);

    return(
        <>
            <UserLayout
                title="Home"
                description="testing sidebar"
                >
                Wuwa
                
               

            </UserLayout>
        </>

    )
    
}