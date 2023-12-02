"use client";

import { parseTimeMsToString } from "@/scripts/taskUtils";

export interface ITask {
    id: string;
    title: string;
    time: number;
    description: string;
}

interface TaskProps {
    task: ITask;
}


export default function ActualTask({ task }: TaskProps) {

    const [minutes, seconds] = parseTimeMsToString(task.time);
    
    return (
        <div className="w-[300px] h-fit flex flex-col border-2 border-black rounded-md">
            <div
                className="cursor-pointer p-2 flex flex-row justify-between text-white bg-gray-600 bg-opacity-40"
            >
                <div className="">{task.title}</div>
                <div className="flex px-1 bg-white bg-opacity-30 rounded-md">
                    {minutes}:{seconds}
                </div>
            </div>
                <div className="h-[100px] text-opacity-70 m-1 px-2" >{task.description}</div>
        </div>
    );
}

