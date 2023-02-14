import React, { useEffect } from 'react';

const Countdown = ({ countOver, seconds, setSeconds, audioCountdownSound }) => {
    useEffect(() => {
        let intervalId = null;
        if (countOver) {
            setSeconds(45);
            intervalId = setInterval(() => {
                setSeconds(seconds => {
                    if (seconds < 12) {
                        audioCountdownSound.current.currentTime = 0;
                        audioCountdownSound.current.play()
                    }
                    if (seconds === 0) {
                        clearInterval(intervalId);
                        audioCountdownSound.current.pause()
                    }
                    return seconds === 0 ? 45 : seconds - 1;
                });
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [countOver, setSeconds]);

    return <div className={seconds < 10 ? 'less-than-10' : ''}>{seconds} שניות נותרו</div>
}

export default Countdown;
