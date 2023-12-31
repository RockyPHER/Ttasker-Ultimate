"use client";

import { parseTimeMsToString, parseTimeStringToMs } from "@/scripts/taskUtils";
import { useState, useEffect, SetStateAction, Dispatch, useCallback } from "react";
import MoreIcon from "@/icons/more.svg"
export interface ITask {
    id: string;
    title: string;
    time: number;
    description: string;
    isFocused?: boolean;
    isHovered?: boolean;
}

interface TaskProps {
    task: ITask;
    onUpdateTask: (task: ITask) => void;
    onRemoveTask: (task: ITask) => void;
}

interface TaskTimeComponentProps {
    minutes: string
    seconds: string
}

interface TaskTimeInputProps {
    setMinutes: Dispatch<SetStateAction<string>>
    setSeconds: Dispatch<SetStateAction<string>>
    setShowTimeInput: Dispatch<SetStateAction<boolean>>
    updateTask: () => void
    convertInputToTime: (value: number) => string[]

}

export default function Task({ task, onUpdateTask, onRemoveTask }: TaskProps) {

    const [descIsOpen, setDescIsOpen] = useState(false);
    const [showTimeInput, setShowTimeInput] = useState(false);
    const [showTitleInput, setShowTitleInput] = useState(true);

    const [initialMinutes, initialSeconds] = parseTimeMsToString(task.time);

    const [title, setTitle] = useState<string>(task.title);
    const [minutes, setMinutes] = useState<string>(initialMinutes);
    const [seconds, setSeconds] = useState<string>(initialSeconds);
    const [description, setDescription] = useState<string>(task.description);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    function updateTask() {
        var newTask: ITask = {
            id: task.id,
            title: title,
            time: parseTimeStringToMs(minutes, seconds),
            description: description,
            isFocused: isFocused,
            isHovered: isHovered
        };

        console.log("Console: Task was updated");
        console.log(newTask);

        onUpdateTask(newTask);
    }

    const onKeyDown = useCallback((event: { key: string; }) => {
        console.log("Console: Keypressed");
        if (isFocused && event.key === "Delete") {
            onRemoveTask(task);
        }
    }, [isFocused, onRemoveTask, task]);

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [onKeyDown]);

    function onClickHandler() {
        setIsFocused(true);
        updateTask();
    }
    function onBlurHandler() {
        setIsFocused(false);
        updateTask();
    }

    useEffect(() => {
        checkIfTaskValueIsUpdated();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateTask])

    function checkIfTaskValueIsUpdated() {
        if (title !== task.title || description !== task.description || minutes !== initialMinutes || seconds !== initialSeconds || isFocused !== task.isFocused || isHovered !== task.isHovered) {
            updateTask();
        }
    }

    function convertInputToTime(timeNum: number): string[] {

        let minutes = Math.floor(timeNum / 60).toString();
        let seconds = (timeNum % 60).toString();

        minutes = minutes.padStart(2, "0");
        seconds = seconds.padStart(2, "0");

        return [minutes, seconds]
    }

    return (
        <div onBlur={() => onBlurHandler()} onClick={() => onClickHandler()} className={`overflow-hidden w-[300px] h-fit flex flex-col border-2 border-black rounded-md ${isFocused ? "outline outline-2 outline-white" : ""}`}>
            <div className="cursor-pointer p-2 flex flex-row justify-between text-white bg-gray-400">
                <div className="flex justify-between w-full h-full">
                    <a onClick={() => setShowTitleInput(true)}>
                        <div className="flex justify-center items-center w-full h-full">
                            {showTitleInput ? <input autoFocus type="text" maxLength={20} onBlur={() => { setShowTitleInput(false); updateTask() }} value={title} onChange={(e) => setTitle(e.target.value)} className="w-min bg-transparent outline-none [appearance:textfield]" /> : <div className="">{title}</div>}
                        </div>
                    </a>
                    <a>
                        <div className="flex justify-center items-center translate-y-[1px] pr-1 w-max h-full">
                            <MoreIcon onClick={() => setDescIsOpen(!descIsOpen)} className="hover:bg-gray-300 fill-black active:bg-slate-500 rounded-full w-7 h-7" />
                        </div>
                    </a>
                </div>
                <div className="flex px-1 bg-gray-200 rounded-md">
                    <a onClick={() => setShowTimeInput(true)} className="flex justify-evenly w-full h-full">
                        {showTimeInput ? <TaskTimeInput updateTask={updateTask} setMinutes={setMinutes} setSeconds={setSeconds} setShowTimeInput={setShowTimeInput} convertInputToTime={convertInputToTime} /> : <TaskTimeComponent minutes={minutes} seconds={seconds} />}
                    </a>
                </div>
            </div>
            <div className="w-full h-fit flex">
                {descIsOpen ?
                    (<textarea onBlur={updateTask} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full text-start align-text-top bg-transparent h-[100px] text-slate-600 m-1 px-2 outline-none resize-none" />)
                    : null}
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

export function TaskTimeInput({ updateTask, setMinutes, setSeconds, setShowTimeInput, convertInputToTime }: TaskTimeInputProps) {

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

        let minutes: string
        let seconds: string

        if (inputTime) {
            console.log("Console: Time was set");
            console.log(inputTime);

            minutes = convertInputToTime(inputTime)[0];
            seconds = convertInputToTime(inputTime)[1];

            setMinutes(minutes);
            setSeconds(seconds);

            console.log("Console: TaskTime was set to " + minutes + ":" + seconds);
        }
        else {
            setMinutes("00");
            setSeconds("00");
            console.log("Console: Time was set");
        }

        updateTask();
        setShowTimeInput(false);
    }

    return (
        <form onSubmit={hideAndSetTime} className="bg-black flex justify-evenly w-full h-full ">
            <input autoFocus placeholder="00:00" type="number" onChange={(e) => handleOnInput(e.target.valueAsNumber)} maxLength={4} max={3540} min={0} value={inputTime || ""} className="flex text-center text-slate-900 bg-gray-200 outline-none w-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
        </form>
    );
}