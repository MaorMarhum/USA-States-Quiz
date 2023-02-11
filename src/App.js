import './App.css';
import React, { useState, useEffect, useRef } from "react";
import Data from './Data'

const CountDown = ({ countOver, seconds, setSeconds }) => {
  useEffect(() => {
    let intervalId = null;
    if (countOver) {
      setSeconds(45);
      intervalId = setInterval(() => {
        setSeconds(seconds => {
          if (seconds === 0) {
            clearInterval(intervalId);
          }
          return seconds === 0 ? 45 : seconds - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [countOver]);

  return <div className={seconds < 10 ? 'less-than-10' : ''}>{seconds} שניות נותרו</div>
}


function App() {
  const [states, setStates] = useState(Data);
  const [seconds, setSeconds] = useState(45);
  const [nameUser1, setNameUser1] = useState('')
  const [nameUser2, setNameUser2] = useState('')
  const [winner, setWinner] = useState(false)
  const [changeNames, setChangeNames] = useState(true)
  const [countOver, setCountOver] = useState(false)
  const [show, setShow] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [stateToRemove, setStateToRemove] = useState("");
  const nameUser1Value = useRef('')
  const nameUser2Value = useRef('')

  const changeName1 = () => {
    setNameUser1(nameUser1Value.current.value)
  }

  const changeName2 = () => {
    setNameUser2(nameUser2Value.current.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (nameUser1 && nameUser2) {
      setShow(false)
      setError('')
      setCountOver(true)
    } else {
      setError('שמות השחקנים נדרשים על מנת להתחיל במשחק')
    }
  }

  const handleChange = (event) => {
    setStateToRemove(event.target.value);
  };

  const handleRemove = () => {
    if (states.includes(stateToRemove)) {
      setStates(states.filter((state) => state !== stateToRemove));
      setStateToRemove("");
      resetSeconds();
      setSuccess('כל הכבוד!')
      setTimeout(() => {
        setSuccess('');
      }, 1000);
      setChangeNames(!changeNames)
      setWinner(!winner)
    } else {
      setError('שם המדינה לא נמצא ברשימה')
      setTimeout(() => {
        setError('');
      }, 1000);
    }
  };

  const resetSeconds = () => {
    setSeconds(45);
    setCountOver(false);
    setCountOver(true)
  }

  if (seconds === 0) {
    alert(`${winner ? nameUser1 : nameUser2} ניצח את המשחק`)
  }

  return (
    <>
      {show ? (
        <section className='section1'>
          <h1>ברוכים הבאים למשחק מדינות ארצות הברית</h1>
          <h2>אנא מלאו את הטופס על מנת להתחיל</h2>
          <form onSubmit={handleSubmit} className='section1__form'>
            <label htmlFor="name1">שחקן 1:</label>
            <input type="text" id='name1' placeholder='אנא הכנס שם...' onChange={changeName1} ref={nameUser1Value} />
            <label htmlFor="name2">שחקן 2:</label>
            <input type="text" id='name2' placeholder='אנא הכנס שם...' onChange={changeName2} ref={nameUser2Value} />
            <p className='error'>{error}</p>
            <button type='submit' className='button-18'>התחל עכשיו!</button>
          </form>
        </section>
      ) : (
        <section className='section2'>
          <h1>תורו של <span className='section2-p'>{changeNames ? nameUser1 : nameUser2}</span> לשחק</h1>
          <div className='section2__countdown'>
            <CountDown
              countOver={countOver}
              seconds={seconds}
              setSeconds={setSeconds}
            />
          </div>
          <div className='section2__form'>
            <input
              type="text"
              value={stateToRemove}
              onChange={handleChange}
              placeholder="אנא הכנס שם מדינה..."
            />
            <p className='error'>{error}</p>
            <p className='success'>{success}</p>
            <button className='button-18' onClick={handleRemove}>נסה את מזלך</button>
          </div>
        </section>
      )}
    </>
  )
}

export default App;