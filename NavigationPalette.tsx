import { useAssessment } from '../contexts/AssessmentContext'

export default function NavigationPalette() {
  const { assessment, currentQuestionIndex, setCurrentQuestionIndex, answers, markedForReview } = useAssessment()

  const getQuestionStatus = (index: number) => {
    if (markedForReview[index]) return 'bg-yellow-500'
    if (answers[index] !== undefined) return 'bg-green-500'
    return 'bg-gray-300 dark:bg-gray-600'
  }

  return (
    <div className="w-1/4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow ml-4">
      <h2 className="text-xl font-semibold mb-4">Question Palette</h2>
      <div className="grid grid-cols-5 gap-2">
        {assessment.questions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestionIndex(index)}
            className={`w-8 h-8 rounded-full ${getQuestionStatus(index)} ${
              index === currentQuestionIndex ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

