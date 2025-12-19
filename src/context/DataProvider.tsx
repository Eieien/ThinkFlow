import type { Note, Quiz, Users } from "@/configs/DataTypeConfig";
import { useActions } from "@/hooks/useActions";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {type ReactNode, createContext, useState, type Dispatch, type SetStateAction, useEffect} from "react";

interface DataProviderProps {
    children: ReactNode;
  }

export interface Data{
    userData: Users,
    setUserData: Dispatch<SetStateAction<Users>>,
    globalNotes: Note[],
    globalQuizzes: Quiz[],
    usersList: Users[],
    userNotes: Note[],
    userQuizzes: Quiz[],
    bookmarks: Note[],
    setBookmarks: Dispatch<SetStateAction<Note[]>>,
    setUserNotes: Dispatch<SetStateAction<Note[]>>,
    currentNoteId: String,
    setCurrentNoteId: Dispatch<SetStateAction<string>>,

}

const DataContext = createContext<Data>({
    userData:  {
        _id: '',
        username: '',
        email: '',
        createdAt: '',
        updatedAt: '',
        deactivated: false
    },
    setUserData: () => {},
    globalNotes: [],
    globalQuizzes: [],
    usersList: [],
    userNotes: [],
    userQuizzes: [],
    bookmarks: [],
    setBookmarks: () => {},
    setUserNotes: () => {},
    currentNoteId: "",
    setCurrentNoteId: () => {},
});

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    
    const [userData, setUserData] = useState<Users>({
        _id: '',
        username: '',
        email: '',
        createdAt: '',
        updatedAt: '',
        deactivated: false
    });
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
                const getUserData = await axiosPrivate.get(`/users/${auth.user?._id}`);
                const globalNotes = await axiosPrivate.get('/notes/');
                const globalQuizzes = await axiosPrivate.get('/quizzes/');
                const getUserNotes = await axiosPrivate.get(`notes/user/${auth.user?._id}`);
                const getUserQuizzes = await axiosPrivate.get(`quizzes/user/${auth.user?._id}`);
                const getUsersList = await axiosPrivate.get("/users/");
                
                setUserData(getUserData.data);
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
                userData,
                setUserData,
                globalNotes,
                globalQuizzes,
                userNotes, 
                setUserNotes, 
                currentNoteId, 
                setCurrentNoteId, 
                bookmarks, 
                setBookmarks, 
                userQuizzes,
                usersList,
            }
            }>
        {children}
        </DataContext.Provider>
    );
};

export default DataContext;


  