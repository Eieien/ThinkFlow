import {useState, useEffect} from "react"

export function useCardType(initialCardType = "Notes"){
    const [cardType, setCardType] = useState(initialCardType);
    const [source, setSource] = useState("owned");
    useEffect(() => {

        const savedCardType = localStorage.getItem("Card Type") || "Notes";
        setCardType(savedCardType);

    }, [])

    const notes = () => {
        setCardType("Notes")
        setSource("owned");
        localStorage.setItem("Card Type", "Notes");
    };
    const quizzes = () => {
        setCardType("Quizzes")
        localStorage.setItem("Card Type", "Quizzes");
    };
    const bookmarks = () => {
        setSource("bookmarks")
        setCardType("Notes")
        // localStorage.setItem("Card Type", "Bookmarks");
    };

    return {cardType, source, notes, quizzes, bookmarks};
}