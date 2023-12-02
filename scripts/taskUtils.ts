export function parseTimeMsToString(time: number) {
    const minutes = Math.floor(time / 1000 / 60);
    const seconds = Math.floor((time / 1000) % 60);

    const formatedMinutes = minutes.toString().padStart(2, "0");
    const formatedSeconds = seconds.toString().padStart(2, "0");

    return [formatedMinutes, formatedSeconds];
}

export function parseTimeStringToMs(minutes: string, seconds: string): number {
    const parsedMinutes = parseInt(minutes, 10);
    const parsedSeconds = parseInt(seconds, 10);

    if (isNaN(parsedMinutes) || isNaN(parsedSeconds)) {
        throw new Error("Invalid input");
    }

    return parsedMinutes * 60000 + parsedSeconds * 1000;
}