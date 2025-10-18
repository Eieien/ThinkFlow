import React from "react";

interface NotesCardProps{
    title: String;
    dateCreated: String;
    creator: String;
    description: String;
}

export default function NotesCard({title, dateCreated, creator, description} : NotesCardProps){

    return (
        <div className="w-80 card">
            <h1>{title}</h1>
            <div className="flex gap-2">
                <h3>{dateCreated}</h3>
                <h3>{creator}</h3>
            </div>

            <h2>
                {description}
            </h2>

        </div>
    )
}