"use client"

import React from "react"
import { useState, useEffect } from "react"
import PlayIcon from "@/icons/play.svg"

interface timerButtonProps {
    onClickHandler: () => void
}

export default function Timer() {

    var mock = ['00', '00']

    const [minutes, seconds] = mock;
    
    function timer (time: number) {

    }

    function startTimer () {

    }

    function playButtonHandler () {
    }

    function convertTimeMsToString (time: number) {
    }
    function convertTimeStringToMs (minutes: string, seconds: string) {
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