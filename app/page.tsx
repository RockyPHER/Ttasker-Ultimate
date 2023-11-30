import Image from 'next/image'
import Timer from '@/components/Timer/TimerMain'

export default function Home() {
  return (
    <main className='w-screen h-screen translate-y-[-16vh] bg-[--background-end-rgb] flex flex-col items-center justify-center'>
      <Timer />
    </main>
  );
}