import { useEffect, ChangeEvent, useState } from "react"
import confetti from "canvas-confetti"

function App() {
  const [isValid, setIsValid] = useState(false)
  const [query, setQuery] = useState("")
  const [isInputTouched, setIsInputTouched] = useState(false)
  const [mouseCoordinates, setMouseCoordinates] = useState({x: 0, y: 0})
  const checkPwd = (pwd: string) => {
    setIsValid(isInputTouched && pwd.length >= 8)
  }
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPwd = event.target.value
    setQuery(newPwd)
    checkPwd(newPwd)
  }
  const handleInputTouch = () => {
    setIsInputTouched(true)
  }
  const handleMouseMove = (_event: MouseEvent) => {
    setMouseCoordinates({
      x: _event.clientX,
      y: _event.clientY
    })
  }
  const count = 200
  const defaults = {
    origin: { y: 0.7 }
  }

  function fire(particleRatio: number, opts: confetti.Options | undefined) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    })
  }
  const handleBtnClicked = () => {
    if (isValid) {
      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      })
      fire(0.2, {
        spread: 60,
      })
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      })
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      })
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      })
    }
  }
  useEffect(()=> {
    window.addEventListener("mousemove", handleMouseMove)
    return (() => {
      window.removeEventListener("mousemove", handleMouseMove)
    })
  }, [])
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-y-5 justify-center items-center">
        <div className="flex flex-col gap-y-2">
          <input
            type="password"
            onChange={handleInputChange}
            onFocus={handleInputTouch}
            value={query}
            className={`py-3 px-5 rounded-sm outline outline-neutral-400 ${isInputTouched && isValid ? 'focus:outline-green-400' : 'focus:outline-red-400'}`}
          />
        </div>
        <button
          style={{ transition: "transform 0.3s ease-in-out" }}
          className={`bg-blue-500 text-neutral-50 py-4 px-6 w-fit rounded-lg ${isValid ? '' : (mouseCoordinates.x < 915 && mouseCoordinates.x > 800 && 'translate-x-20')} ${isValid ? '' : (mouseCoordinates.x > 905 && mouseCoordinates.x < 1025 && 'translate-x-[-80px]')}`}
          onClick={handleBtnClicked}
          disabled={!isValid}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default App
