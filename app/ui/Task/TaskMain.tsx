"use client"

import { useState, useEffect } from "react";

export default function Task() {

    var mockTitle = "Title";
    var mockMinutes = "00";
    var mockSeconds = "00";
    var mockDescription = "Description";

    const [title, setTitle] = useState(mockTitle);
    const [minutes, setMinutes] = useState(mockMinutes);
    const [seconds, setSeconds] = useState(mockSeconds);
    const [description, setDescription] = useState(mockDescription);

    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className="w-[300px] h-fit flex flex-col border-2 border-black rounded-md">
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer m-1 p-2 rounded-md flex flex-row justify-between text-white bg-black bg-opacity-40">
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
           