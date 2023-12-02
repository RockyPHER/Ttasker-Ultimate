"use client";

import React from "react";
import { useState, useEffect } from "react";
import { parseTimeMsToString, parseTimeStringToMs } from "@/scripts/taskUtils";
import { TimerButton } from "./TimerButton";
import { ITask } from "../Task";
import ActualTask from "../ActualTask";

interface TimerProps {
    task: ITask | null;
    onNextTask: () => void;
    onFinishTask: () => void;
}

export default function Timer({ task, onNextTask, onFinishTask }: TimerProps) {
    const taskTime = task?.time;

    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    //Timer Logic
    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval>;
        console.log('isRunning:', isRunning);
        console.log('time:', time);

        if (isRunning && time > 0) {
            intervalId = setInterval(() => {
                console.log("Console: Timer is running...");
                setTime((prevTime) => {
                    const newTime = prevTime - 1000;
                    if (newTime <= 0) {
                        console.log("Console: Timer is done\nConsole: isRunning set to false");

                        setIsRunning(false);
                        clearInterval(intervalId);
                        onFinishTask();
                        return 0;
                    }
                    return newTime;
                });
            }, 1000);
        }

        return () => {
            intervalId ? clearInterval(intervalId) : null;
        };
    }, [isRunning, time, taskTime]);

    //Timer Display
    useEffect(() => {
        setMinutes(parseTimeMsToString(time)[0]);
        setSeconds(parseTimeMsToString(time)[1]);
    }, [time]);

    function getTaskTimeMs(taskTime: [string, string]): number {
        const taskMinutes = taskTime[0];
        const taskSeconds = taskTime[1];

        const taskTimeMs = parseTimeStringToMs(taskMinutes, taskSeconds);

        return taskTimeMs;
    }

    function playButtonHandler() {
        console.log("Console: Button was clicked");
        console.log(task);
        if (!task){
            onNextTask();
            return;
        }
        if (time === 0) {
            console.log("Console: Timer value was reset");
            setTime(task.time);
        }
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    }
    function startTimer() {
        console.log("Console: isRunning set to true");
        setIsRunning(true);
    }
    function stopTimer() {
        setIsRunning(false);
    }

    return (
        <div className="flex flex-col space-y-5">
            <div className="select-none w-auto h-[26vh] px-4 flex items-center justify-center bg-gray-600 bg-opacity-50 ">
                <span className="text-[25vh]">{minutes}</span>
                <span className="text-[25vh]">:</span>
                <span className="text-[25vh]">{seconds}</span>
            </div>
            <div>
                <TimerButton onClickHandler={playButtonHandler} isPlaying={isRunning} />
            </div>
            {task && <ActualTask task={task}/>}
        </div>
    );
}

