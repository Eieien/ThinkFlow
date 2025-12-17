import { useContext } from "react"
import DataContext from "@/context/DataProvider"

export const useDataContext = () => {
    const context = useContext(DataContext);
    return context;
}

