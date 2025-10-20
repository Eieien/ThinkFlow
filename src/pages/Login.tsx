import React from "react";
import Layout from "../components/layout/Layout";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { Link } from "react-router-dom";
import logo from "../assets/images/Thinkflow_Logo.svg"
import LogoStyle from "../components/LogoStyle";

export default function Login(){

    return (

        <>
            <Layout
            title="login"
            description="Login in Thinkflow"
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
                    <div className="absolute inset-0 top-30 left-0">
                        <div className="flex justify-center items-center">
                            <div className="bg-primary-white dark:bg-primary-dark min-w-100 w-110 max-w-120 h-auto  shadow-lg rounded-md p-4">
                                <div className="flex flex-col gap-4 mx-8">
                                    <LogoStyle type="vertical"/>
                                    <h3 className="text-dark-4 text-xl font-bold dark:text-light-4">Login to your Account</h3>
                                    <div className="flex flex-col">
                                        <label>Email</label>
                                        <input placeholder="Enter your Email Address" className="auth-input"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label>Password</label>
                                        <input placeholder="Enter your password" className="auth-input"/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <button className="px-4 py-2 bg-light-primary-blue dark:bg-dark-primary-blue text-primary-white font-bold rounded-md">
                                            Login
                                        </button>
                                        <p className="font-medium text-dark-border dark:text-light-border">Forgot Password?</p>
                                    </div>
                                    <h2 className="text-dark-border dark:text-light-border text-center font-regular">Don't have an account? <Link to="/signup"><span className="text-light-primary-blue">Sign up</span></Link></h2>

                                </div>

                            </div>

                        </div>

                    </div>


                </section>

            </Layout>
        </>
    )
}