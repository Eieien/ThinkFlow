import axiosPublic from "@/api/axiosInstances";
import type { Note, Quiz, Tag, Users } from "@/configs/DataTypeConfig";
import { useActions } from "@/hooks/useActions";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useRefreshToken from "@/hooks/useRefreshToken";
import {type ReactNode, createContext, useState, type Dispatch, type SetStateAction, useEffect, useCallback} from "react";

interface DataProviderProps {
    children: ReactNode;
  }

export interface Data{
    userData: Users,
    setUserData: Dispatch<SetStateAction<Users>>,
    globalNotes: Note[],
    globalQuizzes: Quiz[],
    setGlobalQuizzes: Dispatch<SetStateAction<Quiz[]>>,
    usersList: Users[],
    userNotes: Note[],
    userQuizzes: Quiz[],
    bookmarks: Note[],
    setBookmarks: Dispatch<SetStateAction<Note[]>>,
    setUserNotes: Dispatch<SetStateAction<Note[]>>,
    currentNoteId: String,
    setCurrentNoteId: Dispatch<SetStateAction<string>>,
    userTags: Tag[],
    setUserTags: Dispatch<SetStateAction<Tag[]>>,
    updateNotes: () => Promise<void>,

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
    setGlobalQuizzes: () => {},
    usersList: [],
    userNotes: [],
    userQuizzes: [],
    bookmarks: [],
    setBookmarks: () => {},
    setUserNotes: () => {},
    currentNoteId: "",
    setCurrentNoteId: () => {},
    userTags: [],
    setUserTags: () => {},
    updateNotes: async () => {},
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
    const [userTags, setUserTags] = useState<Tag[]>([]);
    const {auth} = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const refresh = useRefreshToken();

    useEffect(() => {
        if(Object.keys(auth).length == 0){
            refresh();
            console.log("refreshed");
        }
        try{
            const getData = async() => {
                const globalNotes = await axiosPublic.get('/notes/');
                const globalQuizzes = await axiosPublic.get('/quizzes/');
                const getUsersList = await axiosPublic.get("/users/");

                setGlobalNotes(globalNotes.data);
                setGlobalQuizzes(globalQuizzes.data);
                setUserList(getUsersList.data);
                setBookmarks(globalNotes.data.filter((note : Note) => note.options.bookmarked == true));

                if(Object.keys(auth).length > 0){
                    const getUserData = await axiosPrivate.get(`/users/${auth.user?._id}`);
                    const getUserNotes = await axiosPrivate.get(`notes/user/${auth.user?._id}`);
                    const getUserQuizzes = await axiosPrivate.get(`quizzes/user/${auth.user?._id}`);
                    const getUserTags = await axiosPrivate.get(`/tags/user/${auth.user?._id}`);

                    setUserData(getUserData.data);
                    setUserQuizzes(getUserQuizzes.data);
                    setUserNotes(getUserNotes.data);
                    setUserTags(getUserTags.data);
                }
            }
            getData();
        }catch(err){
            console.log(err)
        }

    }, [auth, axiosPrivate])

    const updateNotes = useCallback(async () => {
        try {
            const globalNotes = await axiosPublic.get('/notes/');
            setGlobalNotes(globalNotes.data);
            setBookmarks(globalNotes.data.filter((note: Note) => note.options.bookmarked == true));
            
            if(Object.keys(auth).length > 0){
                const getUserNotes = await axiosPrivate.get(`notes/user/${auth.user?._id}`);
                setUserNotes(getUserNotes.data);
            }
            
            console.log("Notes updated successfully");
        } catch(err) {
            console.error("Error updating notes:", err);
        }
    }, [auth, axiosPrivate]);
    
    

    useEffect(() => {
        console.log("GLOBAL NOTES: ");
        console.log(globalQuizzes);
    }, [globalQuizzes])


    return (
        <DataContext.Provider value={
            { 
                userData,
                setUserData,
                globalNotes,
                globalQuizzes,
                setGlobalQuizzes,
                userNotes, 
                setUserNotes, 
                currentNoteId, 
                setCurrentNoteId, 
                bookmarks, 
                setBookmarks, 
                userQuizzes,
                usersList,
                userTags,
                setUserTags,
                updateNotes,
            }
            }>
        {children}
        </DataContext.Provider>
    );
};

export default DataContext;


  