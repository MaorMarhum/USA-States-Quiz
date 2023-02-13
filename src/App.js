import './App.css';
import React, { useState, useRef } from "react";
import Data from './Data'
import Cube from './components/cube/Cube';
import Error from './assets/error.mp3'
import Success from './assets/success.mp3'
import Countdown from './components/countdown/Countdown';

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
  const [noStates, setNoStates] = useState([])
  const nameUser1Value = useRef('')
  const nameUser2Value = useRef('')
  const audioSuccess = useRef(new Audio(Success));
  const audioError = useRef(new Audio(Error));

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
      setNoStates([...noStates, stateToRemove])
      audioSuccess.current.play();
      setStateToRemove("");
      resetSeconds();
      setSuccess('כל הכבוד!')
      setTimeout(() => {
        setSuccess('');
      }, 1000);
      setChangeNames(!changeNames)
      setWinner(!winner)
    } else {
      audioError.current.play();
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
          <h2>עליכם להזין, כל משתתף בתורו, שם של מדינה הנמצאת בארצות הברית. לאחר הזנת מדינה, לא יהיה ניתן להשתמש בה שוב. משתתף שלא יצליח לחשוב על שם של מדינה תוך 45 שניות, יפסיד!</h2>
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
          <div className='section2__names'>
            <div className='section2__names-title'>
              <h1>{nameUser1}</h1>
              <h1>{nameUser2}</h1>
            </div>
            <Cube winner={winner} />
          </div>
          <div className='section2__countdown'>
            <Countdown
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
          <div className='section2__nostates'>
            <h1>מדינות ששומשו</h1>
            <ol>
              {noStates.map((state, index) => {
                return (
                  <li key={index}>{state}</li>
                )
              })}
            </ol>
          </div>
        </section>
      )}
    </>
  )
}

export default App;