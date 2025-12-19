import QuizContext from "@/context/QuizProvider"
import { createContext, useContext } from "react"

export const useQuizContext = () => {
    const context = useContext(QuizContext);
    return context;
}