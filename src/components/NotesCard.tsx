import React from "react";
import {Bookmark} from "lucide-react";

interface NotesCardProps{
    title?: String;
    noOfBookmarked?: String;
    dateCreated?: String;
    creator?: String;
    description?: String;
    tag?: String;
}

export default function NotesCard({title, noOfBookmarked, dateCreated, creator, tag, description} : NotesCardProps){

    return (
        <div className="w-full card cursor-pointer">
            <div className="flex gap-2 justify-between">
                <h1 className="text-2xl font-bold ">{title}</h1>
                <div className="flex gap-2 justify-between items-center">
                    <button id="bookmarkBtn" className="cursor-pointer">
                        <Bookmark className="h-5"/>
                    </button>
                    <h3 className="text-dark-border dark:text-light-border w-5">{noOfBookmarked}</h3>
                </div>
            </div>
            <div className="flex gap-2">
                <h3 className="text-dark-border dark:text-light-border">Created On {dateCreated}</h3>
                <h3 className="text-dark-border dark:text-light-border">{creator}</h3>
            </div>
            <div className="flex gap-2">
                <h3 className="border border-light-border bg-primary-white text-dark-border bg-primary-light px-7 py-0.5  rounded-4xl dark:text-light-border dark:border-light-border dark:bg-primary-dark">{tag}</h3>
                <h3 className="border border-light-border bg-primary-white text-dark-border bg-primary-light px-7 py-0.5  rounded-4xl dark:text-light-border dark:border-light-border dark:bg-primary-dark">{tag}</h3>
            </div>

            <h2 className="mt-5 mb-5">
                {description}
            </h2>

        </div>
    )
}