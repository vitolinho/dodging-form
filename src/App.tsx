import { useEffect, ChangeEvent, useState } from "react"

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
  const handleBtnClicked = () => {
    if (isValid) {
      alert('cliqué !')
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
