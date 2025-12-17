import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import { useDataContext } from "./useDataContext";


export function useActions() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const {userNotes, setUserNotes} = useDataContext();

    const onCreateNote = async () => {
        try {

            const res = await axiosPrivate.post('/notes/create', 
                {
                    userId: auth.user?._id,
                    title: "Untitled",
                    description: "Untitled description"
                },
                { 
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            const noteId = res.data.createdNote._id;
            const getNote = await axiosPrivate.get(`/notes/${noteId}`);
            navigate(`/notes/${getNote.data._id}`);
        }catch(err){
            console.log(err);
        }
    }

    const deleteNote = async (noteId: string) => {
        
        try{
            setUserNotes(prev =>
                prev.filter(note => note._id !== noteId)
            );
            const res = await axiosPrivate.delete(`/notes/${noteId}`);
            console.log("DELETED");
        }catch(err){
            console.log("DELETED WENT WRONG");
            console.error(err);
        }
    };

    return {
        onCreateNote,
        deleteNote,
        userNotes,
    };
}