import { useCallback } from 'react'
import { useAssessment } from '../contexts/AssessmentContext'
import MultipleChoice from './question-types/MultipleChoice'
import TrueFalse from './question-types/TrueFalse'
import BriefAnswer from './question-types/BriefAnswer'
import MatchTheFollowing from './question-types/MatchTheFollowing'
import CodingQuestion from './question-types/CodingQuestion'

export default function QuestionDisplay() {
  const { assessment, currentQuestionIndex, setCurrentQuestionIndex, answers, setAnswers } = useAssessment()
  const currentQuestion = assessment.questions[currentQuestionIndex]

  const handleAnswer = useCallback((answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }))
  }, [currentQuestionIndex, setAnswers])

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return <MultipleChoice question={currentQuestion} onAnswer={handleAnswer} currentAnswer={answers[currentQuestionIndex]} />
      case 'true-false':
        return <TrueFalse question={currentQuestion} onAnswer={handleAnswer} currentAnswer={answers[currentQuestionIndex]} />
      case 'brief-answer':
        return <BriefAnswer question={currentQuestion} onAnswer={handleAnswer} currentAnswer={answers[currentQuestionIndex]} />
      case 'match-the-following':
        return <MatchTheFollowing question={currentQuestion} onAnswer={handleAnswer} currentAnswer={answers[currentQuestionIndex]} />
      case 'coding':
        return <CodingQuestion question={currentQuestion} onAnswer={handleAnswer} currentAnswer={answers[currentQuestionIndex]} />
      default:
        return <div>Unknown question type</div>
    }
  }

  return (
    <div className="w-3/4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Question {currentQuestionIndex + 1}</h2>
      {renderQuestion()}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentQuestionIndex(prev => Math.min(assessment.questions.length - 1, prev + 1))}
          disabled={currentQuestionIndex === assessment.questions.length - 1}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

