'use client'

import { useState, useEffect } from "react";
import PlusIcon from "@/icons/plus.svg";
import Task from "@/components/Task/TaskMain";

export default function Stack() {

    var mockStackName = "Stack";

    const [StackName, setStackName] = useState(mockStackName);

    return (
        <div className="flex flex-col items-center justify-between w-[320px] h-full border-2 border-black">
            <div className="flex justify-center items-center w-full h-[70px]"><h1 className="text-3xl">{StackName}</h1></div>
            <div className="w-full h-full flex justify-center space-y-2">
                <Task/>
            </div>
            <div>

            </div>
            <a className="cursor-pointer flex justify-center items-center active:bg-gradient-to-b hover:bg-gradient-to-b from-transparent hover:to-slate-600 active:to-slate-900 w-full p-2">
                <PlusIcon className="w-16 h-16" />
            </a>
        </div>
    );
}