import { useState, useEffect } from 'react'
import { Question, Answer } from '../../types/assessment'

interface MatchTheFollowingProps {
  question: Question
  onAnswer: (answer: Record<string, string>) => void
  currentAnswer: Record<string, string> | undefined
}

export default function MatchTheFollowing({ question, onAnswer, currentAnswer }: MatchTheFollowingProps) {
  const [matches, setMatches] = useState<Record<string, string>>(currentAnswer || {})

  useEffect(() => {
    if (JSON.stringify(matches) !== JSON.stringify(currentAnswer)) {
      onAnswer(matches)
    }
  }, [matches, onAnswer, currentAnswer])

  const handleMatch = (item: string, match: string) => {
    setMatches(prev => {
      const newMatches = { ...prev, [item]: match }
      return JSON.stringify(newMatches) !== JSON.stringify(prev) ? newMatches : prev
    })
  }

  return (
    <div>
      <p className="mb-4">{question.text}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          {question.items?.map((item, index) => (
            <div key={index} className="mb-2">
              {item}
            </div>
          ))}
        </div>
        <div>
          {question.matches?.map((match, index) => (
            <select
              key={index}
              value={Object.keys(matches).find(key => matches[key] === match) || ''}
              onChange={(e) => handleMatch(e.target.value, match)}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select a match</option>
              {question.items?.map((item, itemIndex) => (
                <option key={itemIndex} value={item}>
                  {item}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>
    </div>
  )
}

