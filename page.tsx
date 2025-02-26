'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import QuestionDisplay from './components/QuestionDisplay'
import NavigationPalette from './components/NavigationPalette'
import SubmissionModal from './components/SubmissionModal'
import { AssessmentProvider } from './contexts/AssessmentContext'

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  return (
    <AssessmentProvider>
      <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${isDarkMode ? 'dark' : ''}`}>
        <Header 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode}
          openSubmitModal={() => setIsSubmitModalOpen(true)}
        />
        <div className="flex w-full max-w-5xl items-start justify-between">
          <QuestionDisplay />
          <NavigationPalette />
        </div>
        <SubmissionModal 
          isOpen={isSubmitModalOpen} 
          onClose={() => setIsSubmitModalOpen(false)} 
        />
      </main>
    </AssessmentProvider>
  )
}

