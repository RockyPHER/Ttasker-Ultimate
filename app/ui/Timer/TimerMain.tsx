"use client"

import React from "react"
import { useState, useEffect } from "react"

export default function Timer() {

    var mock = ['00', '00']

    const [minutes, seconds] = mock;
    
    return(
        <div className="select-none w-auto h-[26vh] px-4 flex items-center justify-center bg-gray-600 bg-opacity-50 ">
            <span className="text-[25vh]">{minutes}</span>
            <span className="text-[25vh]">:</span>
            <span className="text-[25vh]">{seconds}</span>
        </div>
    );
}

export function TimerButton () {
    return (
        <div>
            <button>
                <PlayIcon className="w-6 h-6"/>
            </button>
        </div>
    );
}