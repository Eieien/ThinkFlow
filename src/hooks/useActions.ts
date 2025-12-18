import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import { useDataContext } from "./useDataContext";
import type { Note, Quiz, Users } from "@/configs/DataTypeConfig";


export function useActions() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const {userNotes, setUserNotes, setBookmarks, bookmarks, usersList} = useDataContext();

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
            setUserNotes((prev) => [...prev, getNote.data]);
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
            
            if(bookmarks.find(note => note._id == noteId)){
                setBookmarks(prev => prev.filter(note => note._id !== noteId));
            }

        }catch(err){
            console.log("DELETED WENT WRONG");
            console.error(err);
        }
    };

    const handleBookmark = async(noteId: string) => {
        try{
            
            const file = await axiosPrivate.get(`/notes/${noteId}`);

            
            const isBookmarked = !file.data.options.bookmarked;
            // console.log(isBookmarked);
            const currentItem = userNotes.find(note => note._id == noteId);
            const res = await axiosPrivate.put(`/notes/${noteId}`,
                {
                    title: file.data.title,
                    description: file.data.description,
                    options: {
                        isPublic: file.data.options.isPublic,
                        bookmarked: isBookmarked,
                    },
                    tags: file.data.tags,
                    access: file.data.access,
                }
            )

            setUserNotes(prevNotes => 
                prevNotes.map(note => 
                    note._id === noteId 
                    ? { ...note, options: { ...note.options, bookmarked: !note.options.bookmarked } }
                    : note
                )
            );

            if(!isBookmarked){
                setBookmarks(prev => prev.filter(note => note._id !== noteId));
            }else{
                if (currentItem) {
                    setBookmarks(prev => [...prev, { 
                      ...currentItem, 
                      options: { ...currentItem.options, bookmarked: true } 
                    }]);
                  }
            }
            console.log(isBookmarked);
        }catch(err){
            console.error(err);
        }
    }
    
    const filterPeople = (users : Users[], query: string) => {
        const q = query.toLowerCase();

        return users.filter(user => 
            user.username.toLowerCase().includes(q) ||
            user.username.toLowerCase().includes(q)
        );
    }

    const filterNotesAndQuizzes = (notes: Note[], quizzes: Quiz[], query: string) => {
        const q = query.toLowerCase();
        
        const filteredNotes = notes
          .filter(note => 
            note.title?.toLowerCase().includes(q) || 
            note.description?.toLowerCase().includes(q)
          )
          .map(note => ({ ...note, type: 'note' as const, displayTitle: note.title }));
        
        const filteredQuizzes = quizzes
          .filter(quiz => 
            quiz.quizTitle?.toLowerCase().includes(q) || 
            quiz.description?.toLowerCase().includes(q)
          )
          .map(quiz => ({ ...quiz, type: 'quiz' as const, displayTitle: quiz.quizTitle }));
        
        return [...filteredNotes, ...filteredQuizzes];
      }
    return {
        onCreateNote,
        deleteNote,
        userNotes,
        handleBookmark,
        filterPeople,
        filterNotesAndQuizzes,
    };
}