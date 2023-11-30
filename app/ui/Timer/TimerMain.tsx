"use client"

import React from "react"
import { useState, useEffect } from "react"
import PlayIcon from "@/icons/play.svg"

interface timerButtonProps {
    onClickHandler: () => void
}

export default function Timer() {

    const [minutes, setMinutes] = useState('00')
    const [seconds, setSeconds] = useState('00')
    const [time, setTime] = useState(5000)
    const [isRunning, setIsRunning] = useState(false)
    
    useEffect(() => {
        let intervalId: ReturnType <typeof setInterval>

        if (isRunning) {
            intervalId = setInterval(() => {
                if (time === 0) {
                    clearInterval(intervalId)
                }
                else{
                    setTime((prevTime) => prevTime - 1000)
                }
            }, 1000)
        }

        return () => {
            intervalId ? clearInterval(intervalId) : null
        }
      
    }, [isRunning])

    useEffect(() => {


    }, [time])

    function playButtonHandler () {
        if (isRunning) {
            stopTimer()
        }
        else {
            startTimer()
        }
    }
    function startTimer () {
        setIsRunning(true)
    }
    function stopTimer () {
        setIsRunning(false)
    }
    function resetTimer () {
    }
    

    function convertTimeMsToString (time: number) {

        const minutes = Math.floor((time / 1000) / 60)
        const seconds = Math.floor((time / 1000) % 60)

        const formatedMinutes = minutes.toString().padStart(2, '0')
        const formatedSeconds = seconds.toString().padStart(2, '0')

        return [formatedMinutes, formatedSeconds]
    }
    function convertTimeStringToMs (minutes: string, seconds: string) : number {

        const parsedMinutes = parseInt(minutes, 10)
        const parsedSeconds = parseInt(seconds, 10)

        if (isNaN(parsedMinutes) || isNaN(parsedSeconds)) {
            throw new Error('Invalid input')
        }

        return parsedMinutes * 60000 + parsedSeconds * 1000
    }

    return(
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

export function TimerButton ({onClickHandler}: timerButtonProps) {
    return (
        <div className="flex justify-center items-center w-full">
            <button onClick={onClickHandler} className="flex items-center justify-center py-1 px-6 bg-gray-500 bg-opacity-50 hover:bg-gray-700 hover:bg-opacity-50 active:bg-black active:bg-opacity-50">
                <PlayIcon className="w-16 h-16"/>
            </button>
        </div>
    );
}