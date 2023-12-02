"use client";

import { parseTimeMsToString, parseTimeStringToMs } from "@/scripts/taskUtils";
import { useState, useEffect } from "react";

export interface ITask {
    id: string;
    title: string;
    time: number;
    description: string;
}

interface TaskProps {
    task: ITask;
    onUpdateTask: (task: ITask) => void;
}


export default function Task({ task, onUpdateTask }: TaskProps) {

    const [isOpen, setIsOpen] = useState(false);

    const [initialMinutes, initialSeconds] = parseTimeMsToString(task.time);

    const [title, setTitle] = useState(task.title);
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [description, setDescription] = useState(task.description);

    function updateTask() {
        var newTask: ITask = {
            id: task.id,
            title: title,
            time: parseTimeStringToMs(minutes, seconds),
            description: description
        };
        
        onUpdateTask(newTask);        
    }

    function parseTimeTo2Digits(value: string) {
        console.log(minutes+":"+seconds);
        var time = value.substring(value.length-2, value.length);
        
        if (parseInt(time) >= 60) {
            return "59";
        }
        return value.substring(value.length-2, value.length).padStart(2, "0");
    }

    return (
        <div className="w-[300px] h-fit flex flex-col border-2 border-black rounded-md">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer p-2 flex flex-row justify-between text-white bg-gray-600 bg-opacity-40"
            >
                
                <input onBlur={updateTask} value={title} onChange={(e) => setTitle(e.target.value)} className="bg-transparent outline-none [appearance:textfield]"/>
                <div className="flex px-1 bg-white bg-opacity-30 rounded-md">
                    <input type="number" className="bg-transparent outline-none w-5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" onBlur={updateTask} value={minutes} onChange={(e) => setMinutes(parseTimeTo2Digits(e.target.value))} min={0} max={59} maxLength={2}/>
                    <span>:</span>
                    <input type="number" className="bg-transparent outline-none w-5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" onBlur={updateTask} value={seconds} onChange={(e) => setSeconds(parseTimeTo2Digits(e.target.value))} min={0} max={59} maxLength={2}/>
                </div>
            </div>
            {isOpen ? (
                <input onBlur={updateTask} value={description} onChange={(e) => setDescription(e.target.value)} className="h-[100px] text-opacity-70 m-1 px-2"/>
            ) : null}
        </div>
    );
}

