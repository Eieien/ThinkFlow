import {useState, useEffect} from "react";
import darkLogo from "../assets/images/Thinkflow_Logo_dark.svg"
import lightLogo from "../assets/images/Thinkflow_Logo_light.svg"

interface LogoStyleProps{
    type: String;
}

export default function LogoStyle({type} : LogoStyleProps){
    const [isDarkMode, setDarkMode] = useState(
        document.documentElement.classList.contains("dark")
    );

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const dark = document.documentElement.classList.contains("dark");
            setDarkMode(dark);
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, [])

    const logo = (isDarkMode === true) ?  lightLogo : darkLogo;

    if(type === "vertical"){
        return (
            <div className="flex flex-col justify-center items-center">
                <img
                src={logo}
                alt="Thinkflow"
                loading="lazy"
                className="w-15"
                />
                <h2 className="text-3xl font-bold">Thinkflow</h2>
    
            </div>
    
        )

    }else if(type === "horizontal"){
        return (
            <div className="flex gap-2 items-center">
                <img
                src={logo}
                className="w-20 h-20"
                loading="lazy"
                alt="logo"
                />
                <h1 className="font-bold text-xl">
                    Thinkflow

                </h1>
            </div>
        )
    }

}