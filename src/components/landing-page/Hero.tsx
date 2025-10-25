import react from "react";
export default function Hero(){

    return (
        <>
            <section className="relative w-full min-h-screen">
                <div className="absolute inset-0 top-40 left-0">
                    <div className="text-center flex flex-col justify-center items-center gap-2">
                        {/* <img 
                        className="w-50 h-50" 
                        loading="lazy"
                        src={logo}/> */}
                        <h1 className="text-8xl text-center font-bold">
                            Change your Way of <span>thinking</span> with <span>AI</span>
                        </h1>
                        <p className="text-2xl font-medium text-dark-4 dark:text-light-4">
                            Transform the Way You Study With AI-Generated Quizzes From Your Own Notes
                        </p>
                        <div className="flex justify-center items-center gap-2">
                            <button 
                            className="px-4 py-2 border border-primary-dark text-primary-dark dark:border-primary-white dark:text-white rounded-md cursor-pointer">
                                View Published Notes
                            </button>
                            <button 
                            className="px-4 py-2 bg-light-primary-blue dark:bg-dark-primary-blue text-primary-white rounded-md cursor-pointer">
                                Create your notes
                            </button>
                        </div>

                    </div>

                </div>

            </section>
        
        </>

    )

}