import react from "react";
import {Link} from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher.tsx";
import logo from "../../assets/images/Thinkflow_Logo.svg"
import LogoStyle from "../LogoStyle.tsx";

export default function GuestHeader(){
    return (
        <>
            <div className="h-20 flex flex-row justify-between items-center">
                <Link to="/">
                    <LogoStyle type="horizontal"/>
                
                </Link>

                <div className="flex flex-row gap-2 items-center">
                    <ThemeSwitcher/>
                    <Link to="/login">
                        <button 
                        className="font-bold border border-primary-dark text-primary-dark bg-primary-light px-4 py-2 rounded-md cursor-pointer dark:text-primary-white dark:border-primary-white">
                            Login
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button 
                        className="font-bold bg-light-primary-blue text-primary-white px-4 py-2 rounded-md cursor-pointer">
                            Sign up
                        </button>
                    </Link>
                </div>
                
            </div>

        </>
    )

}