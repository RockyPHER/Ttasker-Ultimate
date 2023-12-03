"use client";

import { parseTimeMsToString, parseTimeStringToMs } from "@/scripts/taskUtils";
import { useState, useEffect, SetStateAction, Dispatch } from "react";

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

interface TaskTimerProps {
    setTimeFunc: Dispatch<SetStateAction<string>> 
    UpdateTask: () => void
    shownValue: string
    timeParserFunc: (value: string) => string
}

interface TimeInputProps {
    hideAndSetTime: () => void
    handleOnInput: () => void
    inputTime: number
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

    function parseAndSetTime(value: string) {
        
        if (value.includes(":")){
            let time = value.split(":");
            setMinutes(time[0]);
            setSeconds(time[1]);
            return;
        }

        setMinutes(convertSecToTime(value)[0]);
        setSeconds(convertSecToTime(value)[1]);
    }

    function convertSecToTime(timeSecs: string) {

        let timeNum = parseInt(timeSecs);

        let minutes = Math.floor(timeNum / 60).toString();
        let seconds = (timeNum % 60).toString();

        return [minutes, seconds]
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
                // onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer p-2 flex flex-row justify-between text-white bg-gray-400"
            >
                
                <input onBlur={updateTask} value={title} onChange={(e) => setTitle(e.target.value)} className="bg-transparent outline-none [appearance:textfield]"/>
                <div className="flex px-1 bg-slate-200 rounded-md">
                    <a onClick={} className="flex justify-evenly w-full h-full">
                        <div className="text-black">{minutes}</div>
                        <div className="text-black">:</div>
                        <div className="text-black">{seconds}</div>
                    </a>
                </div>
            </div>
            {isOpen ? (
                <input onBlur={updateTask} value={description} onChange={(e) => setDescription(e.target.value)} className="h-[100px] text-opacity-70 m-1 px-2"/>
            ) : null}
        </div>
    );
}

export function TimeInput({ hideAndSetTime } : TimeInputProps) {

    let inputTime = 0;

    function handleOnInput (value: number) {
        if (value > 3540) {
            inputTime = 3540;
        } else if (value < 0) {
            inputTime = 0;
        } else {
            inputTime = value;
        }
    }

    return (
        <form onSubmit={hideAndSetTime}>
            <input type="number" onChange={(e) => handleOnInput(e.target.value)} maxLength={4} max={3540} min={0} value={inputTime} className="text-slate-900 bg-transparent outline-none w-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
        </form>
    );
}