import { Question, Answer } from '../../types/assessment'

interface TrueFalseProps {
  question: Question
  onAnswer: (answer: boolean) => void
  currentAnswer: boolean | undefined
}

export default function TrueFalse({ question, onAnswer, currentAnswer }: TrueFalseProps) {
  return (
    <div>
      <p className="mb-4">{question.text}</p>
      <div className="space-x-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name={`question-${question.id}`}
            value="true"
            checked={currentAnswer === true}
            onChange={() => onAnswer(true)}
            className="form-radio"
          />
          <span className="ml-2">True</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name={`question-${question.id}`}
            value="false"
            checked={currentAnswer === false}
            onChange={() => onAnswer(false)}
            className="form-radio"
          />
          <span className="ml-2">False</span>
        </label>
      </div>
    </div>
  )
}

