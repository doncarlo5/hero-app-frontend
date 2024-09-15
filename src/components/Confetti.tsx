import  {  useRef } from "react"
import Confetti from "react-canvas-confetti"

function Fireworks() {
  const confettiRef = useRef(null)

  const fire = () => {
    confettiRef.current &&
      confettiRef.current({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
  }

  return <Confetti ref={confettiRef} />
}

export default Fireworks
