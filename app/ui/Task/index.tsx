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

interface TaskTimeComponentProps {
    minutes: string
    seconds: string
}
interface TimeInputProps {
    setMinutes: Dispatch<SetStateAction<string>>
    setSeconds: Dispatch<SetStateAction<string>>
    setShowInput: Dispatch<SetStateAction<boolean>>
    convertSecToTime: (value: number) => string[]

}

export default function Task({ task, onUpdateTask }: TaskProps) {

    const [descIsOpen, setDescIsOpen] = useState(false);
    const [showInput, setShowInput] = useState(false);

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


    function convertSecToTime(timeNum: number): string[] {

        let minutes = Math.floor(timeNum / 60).toString();
        let seconds = (timeNum % 60).toString();

        minutes = minutes.padStart(2, "0");
        seconds = seconds.padStart(2, "0");

        return [minutes, seconds]
    }

    return (
        <div className="w-[300px] h-fit flex flex-col border-2 border-black rounded-md">
            <div className="cursor-pointer p-2 flex flex-row justify-between text-white bg-gray-400">
                <input onBlur={updateTask} value={title} onChange={(e) => setTitle(e.target.value)} className="bg-transparent outline-none [appearance:textfield]" />
                <div className="flex px-1 bg-slate-200 rounded-md">
                    <a onClick={() => setShowInput(true)} className="flex justify-evenly w-full h-full">
                        {showInput ? <TimeInput setMinutes={setMinutes} setSeconds={setSeconds} setShowInput={setShowInput} convertSecToTime={convertSecToTime} /> : <TaskTimeComponent minutes={minutes} seconds={seconds} />}
                    </a>
                </div>
            </div>
            {descIsOpen ?
                (<input onBlur={updateTask} value={description} onChange={(e) => setDescription(e.target.value)} className="h-[100px] text-opacity-70 m-1 px-2" />)
                : null}
        </div>
    );
}

export function TaskTimeComponent({ minutes, seconds }: TaskTimeComponentProps) {
    return (
        <div className="flex justify-evenly w-full h-full">
            <div className="text-black">{minutes}</div>
            <div className="text-black">:</div>
            <div className="text-black">{seconds}</div>
        </div>
    );
}

export function TimeInput({ setMinutes, setSeconds, setShowInput, convertSecToTime }: TimeInputProps) {

    const [inputTime, setInputTime] = useState<number>();

    console.log("Console: form was created")

    function handleOnInput(value: number) {
        if (value >= 3540) {
            console.log("Console: value was set to 3540");
            setInputTime(3540);
            return 3540;
        } else if (value <= 0) {
            console.log("Console: value was set to 0");
            setInputTime(0);
            return 0;
        } else {
            console.log("Console: value was set to " + value);
            setInputTime(value);
            return value;
        }
    }

    function hideAndSetTime() {
        if (inputTime) {
            setMinutes(convertSecToTime(inputTime)[0]);
            setSeconds(convertSecToTime(inputTime)[1]);
        }
        else {
            setMinutes("00");
            setSeconds("00");
        }
        console.log("Console: Time was set");
        setShowInput(false);
    }

    return (
        <form onSubmit={hideAndSetTime} className="bg-black flex justify-evenly w-full h-full ">
            <input placeholder="0000" type="number" onChange={(e) => handleOnInput(e.target.valueAsNumber)} maxLength={4} max={3540} min={0} value={inputTime || ""} className="text-slate-900 bg-gray-200 outline-none w-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
        </form>
    );
}