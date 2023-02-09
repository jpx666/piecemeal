// 节流

export function throttle (fn: ()=> void, time = 500) {
    let timeOut: number | null;
    return () => {
        if (timeOut) {
            return;
        }
        timeOut = setTimeout(() => {
            fn();
            clearTimeout(timeOut as number);
            timeOut = null;
        }, time)
        
    }
}