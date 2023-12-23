import AppManager from './ui/AppManager';

export default function Home() {

  return (
    <main className='w-screen h-screen bg-gradient-to-br from-gray-300 to-slate-600 flex justify-between'>
      <AppManager />
    </main>
  );
}