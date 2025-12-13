import { Link } from "react-router-dom";
import react from "react";
import Layout from "./Layout";
import LogoStyle from "../LogoStyle.tsx";

export default function Footer(){

    return (
        <>
            <div className="mt-10 border border-t-light-4 dark:border-t-dark-4 h-10 w-full h-full">
                <div className="antialiased max-w-screen-xl mx-auto flex flex-col justify-center">
                    <div className="mt-5 mb-5 w-max">
                        <Link to="/">
                            <LogoStyle type="horizontal"/>
                        </Link>
                    </div>
                    <div className="max-w-3xl text-dark-4 dark:text-light-4">
                        Transform the Way You Study With AI-Generated Quizzes
                    </div>
                    <div className="max-w-3xl text-dark-4 dark:text-light-4">
                        From Your Own Notes
                    </div>
                    <div className="mt-20 mb-5 max-w-3xl text-dark-4 dark:text-light-4">
                        Copyright @ 2025 Thinkflow. All rights reserved
                    </div>
                </div>
            </div>
        </>

    )

}
