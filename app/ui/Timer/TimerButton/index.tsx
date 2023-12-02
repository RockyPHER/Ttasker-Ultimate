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
                className="flex items-center justify-center py-1 px-6 bg-gray-500 bg-opacity-50 hover:bg-gray-700 hover:bg-opacity-50 active:bg-black active:bg-opacity-50"
            >
                {isPlaying ? <PauseIcon className="w-16 h-16" /> : <PlayIcon className="w-16 h-16" />}
            </button>
        </div>
    );
}
