"use client"

import { useState, useEffect } from "react";

export function getTaskTime () : [string, string] {
    var time : [string, string] = ["00", "10"];

    return time;
}

function getTaskTitle () {
    var title : string = "Title";

    return title;
}

export default function Task() {
    var mockDescription = "Description";

    const [title, setTitle] = useState(getTaskTitle());
    const [minutes, setMinutes] = useState(getTaskTime()[0]);
    const [seconds, setSeconds] = useState(getTaskTime()[1]);
    const [description, setDescription] = useState(mockDescription);

    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className="w-[300px] h-fit flex flex-col border-2 border-black rounded-md">
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer p-2 flex flex-row justify-between text-white bg-gray-600 bg-opacity-40">
                <div className="">
                    {title}
                </div>
                <div className="px-1 bg-white bg-opacity-30 rounded-md">
                    {minutes}:{seconds}
                </div>
            </div>
            {isOpen ? 
            <div className="h-[100px] text-opacity-70 m-1 px-2">
                {description}
            </div> : null}
        </div>
    );
}
           