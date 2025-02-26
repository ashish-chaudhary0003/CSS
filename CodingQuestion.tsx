import { useState, useEffect } from 'react'
import { Question, Answer } from '../../types/assessment'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodingQuestionProps {
  question: Question
  onAnswer: (answer: string) => void
  currentAnswer: string | undefined
}

export default function CodingQuestion({ question, onAnswer, currentAnswer }: CodingQuestionProps) {
  const [code, setCode] = useState(currentAnswer || '')

  useEffect(() => {
    onAnswer(code)
  }, [code, onAnswer])

  return (
    <div>
      <p className="mb-4">{question.text}</p>
      <SyntaxHighlighter
        language={question.language}
        style={tomorrow}
        customStyle={{
          padding: '1rem',
          borderRadius: '0.375rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-2 border rounded mt-4"
        rows={10}
        placeholder="Write your code here..."
      />
    </div>
  )
}

