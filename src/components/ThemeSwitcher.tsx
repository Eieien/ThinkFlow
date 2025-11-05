import react, {useState, useEffect} from "react";
import {Sun, Moon} from "lucide-react";

export default function ThemeSwitcher(){
    const [theme, setTheme] = useState("light");
    
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || "light";
        setTheme(savedTheme)
    }, []);

    const changeTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }

    return(

        <>
            <button className="relative bg-primary-white p-2 cursor-pointer dark:bg-primary-dark hover:bg-light-2 dark:hover:bg-dark-2 rounded-md transition-all duration-200 
            "
            onClick={changeTheme}>
                
                <div className="relative w-5 h-5">
                    <Sun className={`absolute inset-0 w-5 h-5
                    ${theme === "light" ? "opacity-100" : "opacity-0"}`}/>


                    <Moon className={`absolute inset-0 w-5 h-5
                    ${theme === "dark" ? "opacity-100" : "opacity-0"}`}/>

                </div>


            </button>
        </>
    )
    

}