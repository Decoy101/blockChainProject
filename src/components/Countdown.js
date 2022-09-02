import React, {useState, useEffect, useRef} from 'react'

/**
 *
 * Countdown component for DAYS HOURS MINUTES SECONDS
 * (SECONDS it's just there to make sure it works without waiting 1 minute each time)
 * The version to display minutes is the commented out code at the bottom of this page
 *
 * @dev This component takes no arguments and requires dev to start and stop the countdown
 * @dev We need to think how to best handle starting and stopping countdown (manually for now)
 * I'm thinking of having the buttons render conditionally only if the address logged in corresponds to the deployer
 */

const STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped',
}

const INITIAL_COUNT = 604800

export default function Countdown() {
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT)
  const [status, setStatus] = useState(STATUS.STOPPED)

  const secondsToDisplay = secondsRemaining % 60
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
  const minutesToDisplay = minutesRemaining % 60
  const hoursRemaining = (minutesRemaining - minutesToDisplay) / 60
  const hoursToDisplay = hoursRemaining % 24
  const daysRemaining = (hoursRemaining - hoursToDisplay) / 24
  const daysToDisplay = daysRemaining % 24


  const handleStart = () => {
    setStatus(STATUS.STARTED)
  }
  const handleStop = () => {
    setStatus(STATUS.STOPPED)
  }
  const handleReset = () => {
    setStatus(STATUS.STOPPED)
    setSecondsRemaining(INITIAL_COUNT)
  }
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1)
      } else {
        setStatus(STATUS.STOPPED)
      }
    },
    status === STATUS.STARTED ? 1000 : null,
  )

  useEffect(() => {
    handleStart()
  }, [])

  return (
    <div className="createDataCountdown">
      <div>
        {twoDigits(daysToDisplay)}D {twoDigits(hoursToDisplay)}H {twoDigits(minutesToDisplay)}M
      </div>
    </div>
  )
}

function useInterval(callback, delay) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

const twoDigits = (num) => String(num).padStart(2, '0')


/** ============================== COUNTDOWN WITH MINUTES DECREMENTS ======================== */

// import React, {useState, useEffect, useRef} from 'react'

// const STATUS = {
//   STARTED: 'Started',
//   STOPPED: 'Stopped',
// }

// const INITIAL_COUNT = 10080

// export default function CountdownApp() {
//   const [minutesRemaining, setMinutesRemaining] = useState(INITIAL_COUNT)
//   const [status, setStatus] = useState(STATUS.STOPPED)

//   const minutesToDisplay = minutesRemaining % 60
//   const hoursRemaining = (minutesRemaining - minutesToDisplay) / 60
//   const hoursToDisplay = hoursRemaining % 24
//   const daysRemaining = (hoursRemaining - hoursToDisplay) / 24
//   const daysToDisplay = daysRemaining % 24


//   const handleStart = () => {
//     setStatus(STATUS.STARTED)
//   }
//   const handleStop = () => {
//     setStatus(STATUS.STOPPED)
//   }
//   const handleReset = () => {
//     setStatus(STATUS.STOPPED)
//     setMinutesRemaining(INITIAL_COUNT)
//   }
//   useInterval(
//     () => {
//       if (minutesRemaining > 0) {
//         setMinutesRemaining(minutesRemaining - 1)
//       } else {
//         setStatus(STATUS.STOPPED)
//       }
//     },
//     status === STATUS.STARTED ? 60000 : null,
//   )
//   return (
//     <div>
//       <button onClick={handleStart} type="button">
//         Start
//       </button>
//       <button onClick={handleStop} type="button">
//         Stop
//       </button>
//       <button onClick={handleReset} type="button">
//         Reset
//       </button>
//       <div>
//       {twoDigits(daysToDisplay)}:{twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}
//       </div>
//     </div>
//   )
// }

// function useInterval(callback, delay) {
//   const savedCallback = useRef()

//   useEffect(() => {
//     savedCallback.current = callback
//   }, [callback])

//   useEffect(() => {
//     function tick() {
//       savedCallback.current()
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay)
//       return () => clearInterval(id)
//     }
//   }, [delay])
// }

// const twoDigits = (num) => String(num).padStart(2, '0')

/** ========================================================================================= */

// Seconds to display -> {twoDigits(secondsToDisplay)}S
