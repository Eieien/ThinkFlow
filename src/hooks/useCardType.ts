import {useState, useEffect} from "react"

export function useCardType(initialCardType = "Notes"){
    const [cardType, setCardType] = useState(initialCardType);

    useEffect(() => {

        const savedCardType = localStorage.getItem("Card Type") || "Notes";
        setCardType(savedCardType);

    }, [])

    const notes = () => {
        setCardType("Notes")
        localStorage.setItem("Card Type", "Notes");
    };
    const quizzes = () => {
        setCardType("Quiz")
        localStorage.setItem("Card Type", "Quiz");
    };
    const bookmarks = () => {
        setCardType("Bookmarks")
        localStorage.setItem("Card Type", "Bookmarks");
    };

    return {cardType, notes, quizzes, bookmarks};
}