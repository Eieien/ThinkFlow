import type { Note, Quiz, Users } from "@/configs/DataTypeConfig";
import { useActions } from "@/hooks/useActions";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {type ReactNode, createContext, useState, type Dispatch, type SetStateAction, useEffect} from "react";

interface DataProviderProps {
    children: ReactNode;
  }

export interface Data{
    globalNotes: Note[],
    globalQuizzes: Quiz[],
    usersList: Users[],
    userNotes: Note[],
    bookmarks: Note[],
    setBookmarks: Dispatch<SetStateAction<Note[]>>,
    setUserNotes: Dispatch<SetStateAction<Note[]>>,
    currentNoteId: String,
    setCurrentNoteId: Dispatch<SetStateAction<string>>,

}

const DataContext = createContext<Data>({
    globalNotes: [],
    globalQuizzes: [],
    usersList: [],
    userNotes: [],
    bookmarks: [],
    setBookmarks: () => {},
    setUserNotes: () => {},
    currentNoteId: "",
    setCurrentNoteId: () => {},
});

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    
    const [userNotes, setUserNotes] = useState<Note[]>([]);
    const [usersList, setUserList] = useState<Users[]>([]);
    const [globalNotes, setGlobalNotes] = useState<Note[]>([]);
    const [globalQuizzes, setGlobalQuizzes] = useState<Quiz[]>([]);
    const [userQuizzes, setUserQuizzes] = useState<Quiz[]>([]);
    const [bookmarks, setBookmarks] = useState<Note[]>([]);
    const [currentNoteId, setCurrentNoteId] = useState("");
    const {auth} = useAuth();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if(!auth){
            return;
        }
        try{
            const getData = async() => {
                const globalNotes = await axiosPrivate.get('/notes/');
                const globalQuizzes = await axiosPrivate.get('/quizzes/');

                const getUserNotes = await axiosPrivate.get(`notes/user/${auth.user?._id}`);
                const getUserQuizzes = await axiosPrivate.get(`notes/user/${auth.user?._id}`);

                const getUsersList = await axiosPrivate.get("/users/");
                
                setGlobalNotes(globalNotes.data);
                setGlobalQuizzes(globalQuizzes.data);

                setUserList(getUsersList.data);
                setUserQuizzes(getUserQuizzes.data);
                setUserNotes(getUserNotes.data);
                setBookmarks(globalNotes.data.filter((note : Note) => note.options.bookmarked == true));
            }
            getData();
        }catch(err){
            console.log(err)
        }

    }, [auth, axiosPrivate])


    return (
        <DataContext.Provider value={
            { 
                globalNotes,
                globalQuizzes,
                userNotes, 
                setUserNotes, 
                currentNoteId, 
                setCurrentNoteId, 
                bookmarks, 
                setBookmarks, 
                usersList,
            }
            }>
        {children}
        </DataContext.Provider>
    );
};

export default DataContext;


  