import { Assessment } from '../types/assessment'

const mockAssessment: Assessment = {
  id: 1,
  title: 'Web Development Fundamentals',
  description: 'Test your knowledge of web development basics',
  duration: 60, // 60 minutes
  studentName: 'John Doe',
  questions: [
    {
      id: 1,
      type: 'multiple-choice',
      text: 'Which of the following is not a valid HTML tag?',
      options: ['<div>', '<span>', '<section>', '<card>']
    },
    {
      id: 2,
      type: 'true-false',
      text: 'CSS stands for Cascading Style Sheets.',
    },
    {
      id: 3,
      type: 'brief-answer',
      text: 'Explain the difference between let and const in JavaScript.',
    },
    {
      id: 4,
      type: 'match-the-following',
      text: 'Match the following HTTP status codes with their meanings:',
      items: ['200', '404', '500', '301'],
      matches: ['OK', 'Not Found', 'Internal Server Error', 'Moved Permanently']
    },
    {
      id: 5,
      type: 'coding',
      text: 'Write a JavaScript function that reverses a string.',
      language: 'javascript'
    }
  ]
}

export default mockAssessment

