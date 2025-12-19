import type { Quiz } from "@/configs/DataTypeConfig";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

interface QuizProviderProps{
    children: ReactNode;
}

export interface quizData{
    score: number;
    setScore: Dispatch<SetStateAction<number>>;
    quizData: Quiz;
    setQuizData: Dispatch<SetStateAction<Quiz>>;
    fetchQuizData: (id: string) => void;
}

const QuizContext = createContext<quizData>({
    score: 0,
    setScore: () => {},
    quizData: {
        _id: "",
        note: "",
        quizTitle: "",
        description: "",
        questions: [],
        createdAt: "",
        updatedAt: "", 
    },
    setQuizData: () => {},
    fetchQuizData: (id: string) => {},
});

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {

    const axiosPrivate = useAxiosPrivate();
    const [score, setScore] = useState(0);
    const [quizData, setQuizData] = useState<Quiz>(
        {
            _id: "",
            note: "",
            quizTitle: "",
            description: "",
            questions: [],
            createdAt: "",
            updatedAt: "", 
        }
    )

    const fetchQuizData = async (quizId: string) =>{
        try{
            const fetchedQuiz = await axiosPrivate(`/quizzes/${quizId}`);
            setQuizData(fetchedQuiz.data);
            console.log(fetchedQuiz.data);
        }catch(err){
            console.error(err);
        }
    } 

    return(
        <QuizContext.Provider value={
            {score, 
            setScore,
            quizData,
            setQuizData,
            fetchQuizData,}}>
        
            {children}
        
        </QuizContext.Provider>
    )
}

export default QuizContext;