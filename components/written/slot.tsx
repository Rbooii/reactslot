"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, RotateCcw } from "lucide-react"
import confetti from "canvas-confetti"

// Slot symbols
const symbols = ["😳", "😂", "🤑", "😑", "😜", "7️⃣", "💎", "🔔", "😭"]

export default function SlotMachine() {
  const [reels, setReels] = useState<string[]>(["❓", "❓", "❓"])
  const [spinning, setSpinning] = useState<boolean>(false)
  const [credits, setCredits] = useState<number>(100)
  const [message, setMessage] = useState<string>("Press SPIN to play!")
  const [jackpot, setJackpot] = useState<number>(1000)
  const [win, setWin] = useState<number | null>(null)
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)

  // Function to spin the reels
  const spinReels = () => {
    if (credits < 10) {
      setMessage("Not enough credits!")
      return
    }

    // Deduct credits for spinning
    setCredits((prev) => prev - 10)
    setWin(null)
    setMessage("Spinning...")
    setSpinning(true)

    // Simulate spinning animation
    const spinDuration = 2000 // 2 seconds
    const spinInterval = 100 // Update every 100ms
    const iterations = spinDuration / spinInterval
    let currentIteration = 0

    const intervalId = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ])

      currentIteration++
      if (currentIteration >= iterations) {
        clearInterval(intervalId)
        finishSpin()
      }
    }, spinInterval)
  }

  // Function to determine the result after spinning
  const finishSpin = () => {
    setSpinning(false)

    // Generate final random symbols
    const finalReels = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
    ]

    setReels(finalReels)

    // Check for wins
    let winAmount = 0
    let resultMessage = "Better luck next time!"

    // All three symbols match (jackpot)
    if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
      if (finalReels[0] === "💎") {
        winAmount = jackpot
        resultMessage = "JACKPOT! 💰💰💰"
        triggerConfetti()
        setJackpot(1000) // Reset jackpot
      } else {
        winAmount = 100
        resultMessage = "BIG WIN! All three match!"
        triggerConfetti()
      }
    }
    // Two symbols match
    else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2] || finalReels[0] === finalReels[2]) {
      winAmount = 20
      resultMessage = "WINNER! Two of a kind!"
    }
    // Special case: any combination with 7️⃣
    else if (finalReels.includes("7️⃣")) {
      winAmount = 5
      resultMessage = "LUCKY 7! Small win!"
    }

    if (winAmount > 0) {
      setCredits((prev) => prev + winAmount)
      setWin(winAmount)
    } else {
      // Increase jackpot when no win
      setJackpot((prev) => prev + 5)
    }

    setMessage(resultMessage)
  }

  // Function to trigger confetti animation
  const triggerConfetti = () => {
    if (confettiCanvasRef.current) {
      const myConfetti = confetti.create(confettiCanvasRef.current, {
        resize: true,
        useWorker: true,
      })

      myConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  // Reset the game
  const resetGame = () => {
    setCredits(100)
    setJackpot(1000)
    setReels(["❓", "❓", "❓"])
    setMessage("Press SPIN to play!")
    setWin(null)
  }

  // Add more credits
  const addCredits = () => {
    setCredits((prev) => prev + 100)
    setMessage("Added 100 credits!")
  }

  return (
    <div className="flex flex-col items-center max-w-md w-full">
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: "100%", height: "100%" }}
      />

      <div className="w-full text-center mb-4">

        <div className="flex justify-between items-center px-2">
          <Badge variant="outline" className="text-lg px-3 py-1 shadow-xl">
            <Coins className="w-4 h-4 mr-1" /> Credits: {credits}
          </Badge>
          <Badge variant="outline" className="text-lg px-3 py-1 shadow-xl">
            Jackpot: {jackpot}
          </Badge>
        </div>
      </div>

      <Card className="w-full bg-gradient-to-b  rounded-xl shadow-xl p-6">
        {/* Slot machine display */}
        <div className="flex justify-center gap-2 ">
          {reels.map((symbol, index) => (
            <div
              key={index}
              className={`w-24 h-24 flex items-center justify-center bg-white rounded-lg border shadow-xl text-5xl
                ${spinning ? "animate-pulse" : ""}`}
            >
              {symbol}
            </div>
          ))}
        </div>

        {/* Win display */}
        {win !== null && (
          <div className="text-center">
            <Badge className="bg-green-600 text-white text-xl px-4 py-2">+{win} credits!</Badge>
          </div>
        )}

        {/* Message display */}
        <div className="text-center">
          <p className="text-lg">{message}</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={spinReels}
            disabled={spinning}
            className="hover:cursor-pointer text-xl py-6 rounded-xl shadow-lg transition-all hover:scale-105"
          >
            Spin 🎰 
          </Button>

          <div className="flex gap-2">
            <Button
              onClick={addCredits}
              variant="outline"
              className="flex-1 w-400"
            >
              <Coins className="mr-2 h-4 w-4" /> Add Credits
            </Button>

            <Button
              onClick={resetGame}
              variant="outline"
              className="flex-1 "
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-4 text-justify text-sm ">
        <p>Bet 10 credits per spin. Match symbols to win!</p>
        <p>Three 💎 = JACKPOT! | Three of a kind = 100 | Two of a kind = 20 | Any 7️⃣ = 5</p>
      </div>
    </div>
  )
}

