import { Question, Answer } from '../../types/assessment'

interface MultipleChoiceProps {
  question: Question
  onAnswer: (answer: string) => void
  currentAnswer: string | undefined
}

export default function MultipleChoice({ question, onAnswer, currentAnswer }: MultipleChoiceProps) {
  return (
    <div>
      <p className="mb-4">{question.text}</p>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              checked={currentAnswer === option}
              onChange={() => onAnswer(option)}
              className="form-radio"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

