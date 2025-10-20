import react from "react";
import Layout from "../components/layout/Layout";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { Link } from "react-router-dom";
import logo from "../assets/images/Thinkflow_Logo.svg"
import LogoStyle from "../components/LogoStyle";

export default function SignUp(){
    return (
        <>
            <Layout
                title="Sign Up to Thinkflow"
                description="Sign up to Thinkflow"
                >
                <section className="relative">
                    <div className="h-20 flex flex-row justify-between items-center">
                        <Link to="/">
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
                        
                        </Link>
                        <ThemeSwitcher/>
                    </div>
                    <div className="absolute inset-0 top-20 left-0">
                        <div className="flex justify-center items-center">
                            <div className="bg-primary-white min-w-100 w-110 max-w-120 h-auto shadow-lg rounded-md p-4 dark:bg-primary-dark">
                                <div className="flex flex-col gap-4 mx-8">
                                    <LogoStyle type="vertical"/>
                                    <h3 className="text-dark-4 dark:text-light-4 text-xl font-bold">Create Your Account</h3>
                                    <div className="flex flex-col">
                                        <label>Username</label>
                                        <input placeholder="Enter your Username" className="auth-input"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label>Email</label>
                                        <input placeholder="Enter your Email Address" className="auth-input"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label>Password</label>
                                        <input placeholder="Enter your password" className="auth-input"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label>Confirm Password</label>
                                        <input placeholder="Re-enter your password" className="auth-input"/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <button className="px-4 py-2 bg-light-primary-blue dark:bg-dark-primary-blue text-primary-white font-bold rounded-md">
                                            Login
                                        </button>
                                    </div>
                                    <h2 className="text-dark-border text-center font-regular">Already Have an Account? <Link to="/login"><span className="text-light-primary-blue">Login</span></Link></h2>

                                </div>

                            </div>

                        </div>

                    </div>


                </section>

            </Layout>
        </>

    )

}