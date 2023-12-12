"use client";

import { parseTimeMsToString, parseTimeStringToMs } from "@/scripts/taskUtils";
import { useState } from "react";
import MoreIcon from "@/icons/more.svg"
import { ITask } from "../page";

interface RunTaskProps {
    task: ITask;
}

interface TaskTimeComponentProps {
    minutes: string
    seconds: string
}


export default function RunTask({ task }: RunTaskProps) {

    const [descIsOpen, setDescIsOpen] = useState(false);

    const title = task.title;
    const time = task.time;
    const minutes = parseTimeMsToString(time)[0]; 
    const seconds = parseTimeMsToString(time)[1];
    const description = task.description;

    return (
        <div className={"overflow-hidden w-[300px] h-fit flex flex-col border-2 border-black rounded-md "}>
            <div className="cursor-pointer p-2 flex flex-row justify-between text-white bg-gray-400">
                <div className="flex justify-between w-full h-full">
                        <div className="flex justify-center items-center w-full h-full">
                            <div className="">{title}</div>
                        </div>
                    <a>
                        <div className="flex justify-center items-center translate-y-[1px] pr-1 w-max h-full">
                            <MoreIcon onClick={() => setDescIsOpen(!descIsOpen)} className="hover:bg-gray-300 fill-black active:bg-slate-500 rounded-full w-7 h-7" />
                        </div>
                    </a>
                </div>
                <div className="flex px-1 bg-gray-200 rounded-md">
                        <TaskTimeComponent minutes={minutes} seconds={seconds} />
                </div>
            </div>
            <div className="w-full h-fit flex">
                {descIsOpen ? <div className="w-full text-start align-text-top bg-transparent h-[100px] text-slate-600 m-1 px-2">{description}</div> : null}
            </div>
        </div>
    );
}


export function TaskTimeComponent({ minutes, seconds }: TaskTimeComponentProps) {
    return (
        <div className="flex items-center justify-evenly w-full h-full">
            <div className="text-black">{minutes}</div>
            <div className="text-black">:</div>
            <div className="text-black">{seconds}</div>
        </div>
    );
}

