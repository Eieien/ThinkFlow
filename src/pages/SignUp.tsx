import react, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { Link } from "react-router-dom";
import LogoStyle from "../components/LogoStyle";
import axiosPublic from "@/api/axiosInstances";
import { AxiosError } from "axios";

export default function SignUp(){
    useEffect(() => {
        async function logout(){ // test logout
            try {
                const res = await axiosPublic.delete(
                    '/auth/logout',
                    { withCredentials: true }
                )
                console.log(res.status);
            } catch (err) {
                if(err instanceof AxiosError){
                    console.log(err?.response?.data);
                } else {
                    console.log(err);
                }
            }
        }
        logout();
    }, []);

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
                                <LogoStyle type={"single"} styles={"w-20 h-20"}/>
                                <h1 className="font-bold text-xl">
                                    Thinkflow

                                </h1>
                            </div>
                        
                        </Link>
                        <ThemeSwitcher/>
                    </div>
                    <div className="flex items-center justify-center min-h-[75vh]">
                        <div className="flex justify-center items-center">
                            <div className="bg-primary-white inset-shadow-sm min-w-100 w-110 max-w-120 h-auto rounded-md p-4 border border-light-border dark:bg-dark-2 dark:border-dark-border">
                                <div className="flex flex-col gap-4 mx-8">
                                    <div className="mt-4 flex flex-col items-center gap-2 justify-center">
                                        <LogoStyle styles="w-20" type="single"/>
                                        <div className="text-center">
                                            <h3 className="text-dark-4 text-xl font-bold dark:text-primary-white">Create Your Account</h3>
                                            <p className="text-dark-3 dark:text-light-border">Sign up today and create your own notes</p>

                                        </div>
                                    </div>
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
                                            Sign up
                                        </button>
                                    </div>
                                    <h2 className="text-dark-4 dark:text-light-4 text-center font-regular">Already Have an Account? <Link to="/login"><span className="text-light-primary-blue">Login</span></Link></h2>

                                </div>

                            </div>

                        </div>

                    </div>


                </section>

            </Layout>
        </>

    )

}