import { useAssessment } from '../contexts/AssessmentContext'

interface SubmissionModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SubmissionModal({ isOpen, onClose }: SubmissionModalProps) {
  const { assessment, answers, submitAssessment } = useAssessment()

  if (!isOpen) return null

  const answeredCount = Object.keys(answers).length
  const totalQuestions = assessment.questions.length

  const handleSubmit = () => {
    submitAssessment()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Confirm Submission</h2>
        <p>You have answered {answeredCount} out of {totalQuestions} questions.</p>
        <p>Are you sure you want to submit your assessment?</p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

