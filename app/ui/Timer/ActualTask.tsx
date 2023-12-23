"use client";

import { parseTimeMsToString } from "@/scripts/taskUtils";
import { ITask } from "../Task/ITask";

interface ActualTaskProps {
    task: ITask;
}

export function ActualTask({ task }: ActualTaskProps) {

    const [minutes, seconds] = parseTimeMsToString(task.time);

    return (
        <div className="overflow-visible w-[300px] h-auto flex flex-col bg-gray-400 rounded-md">
            <div className="bg-slate-600 flex justify-center p-2 w-full h-fit">
                <h1 className="text-lg font-bold text-white">Current Task</h1>
            </div>
            <div className="flex justify-center">
                <div className="w-full h-auto ">
                    <div className="w-full h-fit p-1 flex justify-between">
                        <div className="">{task.title}</div>
                        <div className="flex px-1 bg-gray-200 rounded-md">
                            {minutes}:{seconds}
                        </div>
                    </div>
                    {task.description && <div className="w-full h-fit p-2 border-t-2 border-gray-400" ></div>}
                </div>
            </div>
        </div>
    );
}


