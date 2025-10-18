import react from "react";
import {Link} from "react-router-dom";
export default function GuestHeader(){
    return (
        <>
            <div className="h-20 flex flex-row justify-between items-center">
                <div>
                    Thinkflow
                </div>

                <div className="flex flex-row gap-2 items-center">

                    <Link to="/login">
                        <button 
                        className="border border-primary-dark text-primary-dark bg-primary-light px-4 py-2 rounded-md cursor-pointer">
                            Login
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button 
                        className="bg-light-primary-blue text-primary-white px-4 py-2 rounded-md cursor-pointer">
                            Sign up
                        </button>
                    </Link>
                </div>
                
            </div>

        </>
    )

}