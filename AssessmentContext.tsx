import React, { createContext, useContext, useState, useEffect } from 'react'
import { Assessment, Answer } from '../types/assessment'
import mockAssessment from '../data/mockAssessment'

interface AssessmentContextType {
  assessment: Assessment
  currentQuestionIndex: number
  setCurrentQuestionIndex: (index: number) => void
  answers: Record<number, Answer>
  setAnswers: (answers: Record<number, Answer>) => void
  markedForReview: Record<number, boolean>
  setMarkedForReview: (marked: Record<number, boolean>) => void
  remainingTime: number
  setRemainingTime: (time: number) => void
  submitAssessment: () => void
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined)

export function AssessmentProvider({ children }: { children: React.ReactNode }) {
  const [assessment] = useState<Assessment>(mockAssessment)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, Answer>>({})
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({})
  const [remainingTime, setRemainingTime] = useState(assessment.duration * 60)

  useEffect(() => {
    const savedState = localStorage.getItem('assessmentState')
    if (savedState) {
      const { answers, markedForReview, remainingTime } = JSON.parse(savedState)
      setAnswers(answers)
      setMarkedForReview(markedForReview)
      setRemainingTime(remainingTime)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('assessmentState', JSON.stringify({ answers, markedForReview, remainingTime }))
  }, [answers, markedForReview, remainingTime])

  const submitAssessment = () => {
    // Here you would typically send the answers to a server
    console.log('Assessment submitted:', answers)
    localStorage.removeItem('assessmentState')
  }

  return (
    <AssessmentContext.Provider
      value={{
        assessment,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        answers,
        setAnswers,
        markedForReview,
        setMarkedForReview,
        remainingTime,
        setRemainingTime,
        submitAssessment,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  )
}

export function useAssessment() {
  const context = useContext(AssessmentContext)
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider')
  }
  return context
}

