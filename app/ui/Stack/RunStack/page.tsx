'use client'

import { useState } from "react";
import PlusIcon from "@/icons/plus.svg";
import { ITask } from "@/components/Task/page"
import RunTask from "@/components/Task/RunTask/page";

interface RunStackProps {
    tasks: ITask[];
}

export default function Stack({ tasks }: RunStackProps) {

    const stackName = "RunStack";

    const tasksComponents = tasks && tasks.map((task) => (
        <RunTask
            key={task.id}
            task={task}
        />
    ))


    return (
        <div className="flex flex-col items-center justify-between w-[320px] h-full border-x-2 border-black">
            <div className="flex justify-center items-center w-full h-[70px] mb-2"><h1 className="text-3xl">{stackName}</h1></div>
            <div className="flex flex-col h-full space-y-2">
                {tasksComponents}
            </div>
        </div>
    );
}