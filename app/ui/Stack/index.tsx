'use client'

import { useState } from "react";
import PlusIcon from "@/icons/plus.svg";
import Task, { ITask } from "@/components/Task";

interface StackProps {
    tasks: ITask[];
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

export default function Stack({ tasks, setTasks }: StackProps) {

    const mockStackName = "Stack";

    const [stackName, setStackName] = useState(mockStackName);

    function onCreateTask() {

        const newTask: ITask = {
            id: Date.now().toString(),
            title: "",
            time: 0,
            description: "",
        };

        setTasks([...tasks, newTask]);
    }

    function onUpdateTask(task: ITask) {
        setTasks(tasks.map((t) => t.id === task.id ? task : t));
    }

    return (
        <div className="flex flex-col items-center justify-between w-[320px] h-full border-x-2 border-black">
            <div className="flex justify-center items-center w-full h-[70px] mb-2"><h1 className="text-3xl">{stackName}</h1></div>
            <div className="flex flex-col h-full space-y-2">
                {tasks && tasks.map((task) => (
                    <Task
                        onUpdateTask={onUpdateTask}
                        key={task.id}
                        task={task}
                    />
                ))}
            </div>
            <a onClick={onCreateTask} className="cursor-pointer flex justify-center items-center active:bg-gradient-to-b hover:bg-gradient-to-b from-transparent hover:to-slate-600 active:to-slate-900 w-full p-2">
                <PlusIcon className="w-16 h-16" />
            </a>
        </div>
    );
}