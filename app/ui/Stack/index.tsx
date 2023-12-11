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
            isFocused: false,
            isHovered: false
        };

        console.log("Console: Task was created");
        console.log(newTask);

        setTasks([...tasks, newTask]);
    }

    function onUpdateTask(updatedTask: ITask) {
        setTasks(tasks.map((prevTask) => prevTask.id === updatedTask.id ? updatedTask : prevTask));
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
            <button onClick={onCreateTask} className="transition-all delay-200 cursor-pointer flex justify-center items-center bg-gradient-to-b from-transparent hover:to-slate-600 active:to-slate-900 w-full p-2">
                <PlusIcon className="w-16 h-16" />
            </button>

        </div>
    );
}