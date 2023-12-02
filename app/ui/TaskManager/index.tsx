"use client";
import { useState } from "react";
import { ITask } from "../Task";
import Stack from "../Stack";
import Timer from "../Timer";

export default function TaskManager() {

  const [currentTask, setCurrentTask] = useState<ITask | null>(null);
  const [runTasks, setRunTasks] = useState<ITask[]>([]);


  function onNextTask() {
    if (runTasks.length === 0) {
      return;
    }

    setCurrentTask(runTasks[0]);
    setRunTasks(runTasks.slice(1));

  }

  function onFinishTask() {
    setCurrentTask(null);
  }

  return (
    <>
      <Stack tasks={runTasks} setTasks={setRunTasks}/>
      <div className='flex justify-center items-center w-4/5 h-full'>
        <Timer onFinishTask={onFinishTask} onNextTask={onNextTask} task={currentTask} />
      </div>
    </>
  );

}