import react, {useState, useEffect} from "react"
import UserLayout from "../components/layout/UserLayout"
import NotesEditor from "../components/Notes/NotesEditor"
import axios from "axios"

export default function UserPageTest(){

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000/api/',
    });

    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");
    const [data, setData] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setFile(e.target.files[0])
        }
    }
    const handleFileUpload = async() => {

        if(!file){
            alert("Pleaase select a file")
            return;
        }
        const formData = new FormData();
        formData.append("content", file);

        const postRes = await axiosInstance.post(
            '/notes/import',
            formData,
            {
                headers:{
                    "Content-Type": "multipart/form-data"
                } 
            }
        );
        setData(postRes.data.html);
        console.log(postRes.data.html)
    } 

    return(
        <>
            <UserLayout
                title="test"
                description="testing sidebar"
                >
                    <input type="file" onChange={handleFileChange}></input>
                    <button onClick={handleFileUpload} className="auth-input">Import</button>
                    {file && <p>Selected file: {file.name}</p>}
                    {<NotesEditor data={data} />}
                    
               

            </UserLayout>
        </>

    )
    
}