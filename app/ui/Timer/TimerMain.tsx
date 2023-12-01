"use client";

import React from "react";
import { useState, useEffect } from "react";
import PlayIcon from "@/icons/play.svg";

interface TimerProps {
    taskTime: [string, string];
}
interface timerButtonProps {
    onClickHandler: () => void;
}

export default function Timer({ taskTime }: TimerProps) {
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
        if (time === 0) {
            console.log("Console: Timer value was reset");
            setTime(getTaskTimeMs(taskTime));
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
    function resetTimer() { }

    function parseTimeMsToString(time: number) {
        const minutes = Math.floor(time / 1000 / 60);
        const seconds = Math.floor((time / 1000) % 60);

        const formatedMinutes = minutes.toString().padStart(2, "0");
        const formatedSeconds = seconds.toString().padStart(2, "0");

        return [formatedMinutes, formatedSeconds];
    }
    function parseTimeStringToMs(minutes: string, seconds: string): number {
        const parsedMinutes = parseInt(minutes, 10);
        const parsedSeconds = parseInt(seconds, 10);

        if (isNaN(parsedMinutes) || isNaN(parsedSeconds)) {
            throw new Error("Invalid input");
        }

        return parsedMinutes * 60000 + parsedSeconds * 1000;
    }

    return (
        <div className="flex flex-col space-y-5">
            <div className="select-none w-auto h-[26vh] px-4 flex items-center justify-center bg-gray-600 bg-opacity-50 ">
                <span className="text-[25vh]">{minutes}</span>
                <span className="text-[25vh]">:</span>
                <span className="text-[25vh]">{seconds}</span>
            </div>
            <div>
                <TimerButton onClickHandler={playButtonHandler} />
            </div>
        </div>
    );
}

export function TimerButton({ onClickHandler }: timerButtonProps) {
    return (
        <div className="flex justify-center items-center w-full">
            <button
                onClick={onClickHandler}
                className="flex items-center justify-center py-1 px-6 bg-gray-500 bg-opacity-50 hover:bg-gray-700 hover:bg-opacity-50 active:bg-black active:bg-opacity-50"
            >
                <PlayIcon className="w-16 h-16" />
            </button>
        </div>
    );
}
