import Image from 'next/image'
import Timer from '@/components/Timer/TimerMain'
import Task from '@/components/Task/TaskMain'
import Stack from '@/components/Stack/StackMain'
import { getTaskTime } from '@/components/Task/TaskMain'

export default function Home() {
  return (
    <main className='w-screen h-screen bg-gradient-to-br from-gray-300 to-slate-600 flex justify-between'>
      <Stack />
      <div className='w-3/5 h-full'>
        <Timer taskTime={getTaskTime()}/>
      </div>
    </main>
  );
}