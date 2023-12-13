"use client";
import { useState } from "react";
import { ITask } from "../Task/page";
import Timer from "../Timer/page";
import BackStack from "../Stack/BackStack/page";
import RunStack from "../Stack/RunStack/page";


export default function AppManager() {

  const [currentTask, setCurrentTask] = useState<ITask | null>(null);
  const [runTasks, setRunTasks] = useState<ITask[]>([]);
  const [backTasks, setBackTasks] = useState<ITask[]>([]);

  function startRoutine () {
    if(backTasks.length === 0) {
      return;
    }
    if(runTasks.length !== 0) {
      return;
    }
    setRunTasks(backTasks)
    setBackTasks([])
  }

  function onNextTask() {
    if (runTasks.length === 0) {
      return;
    }
    setCurrentTask(runTasks[0]);
    setRunTasks(runTasks.slice(1));
  }

  function onFinishTask() {
    setCurrentTask(null);
    onNextTask();
  }

  return (
    <>
      <BackStack tasks={backTasks} setTasks={setBackTasks} />
      <div className='flex justify-center items-center w-4/5 h-full'>
        <Timer task={currentTask} onStartButton={startRoutine} onFinishTask={onFinishTask} onNextTask={onNextTask} />
      </div>
      <RunStack tasks={runTasks} />
    </>
  );

}