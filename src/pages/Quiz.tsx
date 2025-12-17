import UserLayout from "@/components/layout/User/UserLayout";
import {useState, useEffect} from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { DataProvider } from "@/context/DataProvider";

export default function Quiz(){

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            if(progress != 100){
                setProgress((prev) => prev + 1);
            }
        }, 1000)
        return () => clearInterval(timer);
    }, [])

    return(
        <>
            <UserLayout
                title="Quiz Page"
                description="Quiz"
            >
                <section className="w-full flex gap-2">
                    <div className="flex flex-col gap-1">
                        <Progress value={progress} className="w-[60%]"/>
                        <h1>8. What is needed for a linked list.</h1>
                        <Button variant="outline">Wuwa</Button>
                        <Button variant="outline">Wuwa</Button>
                        <Button variant="outline">Wuwa</Button>
                        <Button variant="outline">Wuwa</Button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="border border-light-border rounded-md p-2">
                            Timer 
                        </div>
                        <Button variant="outline">Answered</Button>
                        <Button variant="outline">Answered</Button>
                        <Button variant="outline">Answered</Button>
                        <Button variant="outline">Answered</Button>
                    </div>
                </section>


            </UserLayout>

        </>
    )

}