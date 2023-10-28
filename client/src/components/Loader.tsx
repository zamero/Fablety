import { useState, useEffect } from "react"
import "./Loader.scss"

const Loader = () => {
  const [timeLeft, setTimeLeft] = useState(140) // 2 minutes and 20 seconds in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1)
      } else {
        clearInterval(interval)
      }
    }, 1000) // Update every second

    return () => {
      clearInterval(interval)
    }
  }, [timeLeft])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="flex body flex-col">
      <div className="book">
        <div className="book__page">
          <div className="book__page__fill"></div>
          <div className="book__page__fill"></div>
          <div className="book__page__fill"></div>
          <div className="book__page__fill"></div>
          <div className="book__page__fill"></div>
        </div>
      </div>
      {timeLeft > 0 && (
        <div className="countdown">
          <h2 className="text-xl text-secondary font-semibold text-center">
            Book generating please wait {minutes < 10 ? `0${minutes}` : minutes}
            :{seconds < 10 ? `0${seconds}` : seconds}
          </h2>
        </div>
      )}
    </div>
  )
}

export default Loader
