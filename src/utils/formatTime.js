export default function formatTime(time){
    const hr =  (Math.floor(time / 3600)).toString().padStart(2, '0');
    const min = (Math.floor(time / 60) % 60).toString().padStart(2, '0');
    const sec = (time % 60).toString().padStart(2, '0');
    return `${hr}:${min}:${sec}`;
}