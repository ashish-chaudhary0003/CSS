import { useAssessment } from '../contexts/AssessmentContext'
import { useState, useEffect } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

interface HeaderProps {
  isDarkMode: boolean
  setIsDarkMode: (isDark: boolean) => void
  openSubmitModal: () => void
}

export default function Header({ isDarkMode, setIsDarkMode, openSubmitModal }: HeaderProps) {
  const { assessment, remainingTime, setRemainingTime } = useAssessment()
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 0) {
          clearInterval(timer)
          openSubmitModal()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [setRemainingTime, openSubmitModal])

  useEffect(() => {
    if (remainingTime === 600) { // 10 minutes
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 5000)
    }
  }, [remainingTime])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <header className="w-full flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold">{assessment.title}</h1>
        <p>Student: {assessment.studentName}</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </button>
        <div className="text-xl font-semibold">
          Time Remaining: {formatTime(remainingTime)}
        </div>
        <button
          onClick={openSubmitModal}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
      {showWarning && (
        <div className="fixed top-4 right-4 bg-yellow-400 text-black p-2 rounded">
          10 minutes remaining!
        </div>
      )}
    </header>
  )
}

