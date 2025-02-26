import { Question, Answer } from '../../types/assessment'

interface BriefAnswerProps {
  question: Question
  onAnswer: (answer: string) => void
  currentAnswer: string | undefined
}

export default function BriefAnswer({ question, onAnswer, currentAnswer }: BriefAnswerProps) {
  return (
    <div>
      <p className="mb-4">{question.text}</p>
      <textarea
        value={currentAnswer || ''}
        onChange={(e) => onAnswer(e.target.value)}
        className="w-full p-2 border rounded"
        rows={4}
        placeholder="Type your answer here..."
      />
    </div>
  )
}

