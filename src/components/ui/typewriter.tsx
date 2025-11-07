"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface TypewriterProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string
  speed?: number
  delay?: number
}

export function Typewriter({
  text,
  speed = 50,
  delay = 0,
  className,
  ...props
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsStarted(true)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!isStarted) return

    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [isStarted, text, speed])

  return (
    <span className={cn(className)} {...props}>
      {displayedText}
      <span className="animate-ping">|</span>
    </span>
  )
}
