import type { Note, Quiz } from "@/configs/DataTypeConfig";
import { useActions } from "@/hooks/useActions";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {type ReactNode, createContext, useState, type Dispatch, type SetStateAction, useEffect} from "react";

interface DataProviderProps {
    children: ReactNode;
  }

export interface Data{
    userNotes: Note[],
    setUserNotes: Dispatch<SetStateAction<Note[]>>,
    currentNoteId: String,
    setCurrentNoteId: Dispatch<SetStateAction<string>>,

}

const DataContext = createContext<Data>({
    userNotes: [],
    setUserNotes: () => {},
    currentNoteId: "",
    setCurrentNoteId: () => {},
});

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    
    const [userNotes, setUserNotes] = useState<Note[]>([]);
    const [userQuizzes, setUserQuizzes] = useState<Quiz[]>([]);
    const [currentNoteId, setCurrentNoteId] = useState("");
    const {auth} = useAuth();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if(!auth){
            return;
        }

        try{
            const getData = async() => {
                const getNotes = await axiosPrivate.get(`notes/user/${auth.user?._id}`);
                const getQuizzes = await axiosPrivate.get(`notes/user/${auth.user?._id}`);
                setUserQuizzes(getQuizzes.data);
                setUserNotes(getNotes.data);
            }
            getData();
        }catch(err){
            console.log(err)
        }

    }, [auth, axiosPrivate])


    return (
        <DataContext.Provider value={{ userNotes, setUserNotes, currentNoteId, setCurrentNoteId}}>
        {children}
        </DataContext.Provider>
    );
};

export default DataContext;


  