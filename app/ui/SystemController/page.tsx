import PlayIcon from "@/icons/play.svg";
import PauseIcon from "@/icons/pause.svg";

interface timerButtonProps {
    onClickHandler: () => void;
    isPlaying: boolean;
}

export function TimerButton({ onClickHandler, isPlaying }: timerButtonProps) {
    return (
        <div className="flex justify-center items-center w-full">
            <button
                onClick={onClickHandler}
                className="drop-shadow-2xl shadow-slate-600 rounded-md shadow-md flex items-center justify-center px-8 py-2 bg-slate-600 bg-opacity-50 hover:bg-gray-900 hover:bg-opacity-50 active:bg-black active:bg-opacity-50"
            >
                {isPlaying ? <PauseIcon className="drop-shadow-2xl shadow-2xl w-12 h-12" /> : <PlayIcon className="drop-shadow-2xl w-12 h-12" />}
            </button>
        </div>
    );
}
