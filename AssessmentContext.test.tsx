import { render, act } from '@testing-library/react'
import { AssessmentProvider, useAssessment } from '../contexts/AssessmentContext'

describe('AssessmentContext', () => {
  it('provides the correct initial values', () => {
    let contextValues
    function TestComponent() {
      contextValues = useAssessment()
      return null
    }

    render(
      <AssessmentProvider>
        <TestComponent />
      </AssessmentProvider>
    )

    expect(contextValues.currentQuestionIndex).toBe(0)
    expect(contextValues.answers).toEqual({})
    expect(contextValues.markedForReview).toEqual({})
    expect(contextValues.remainingTime).toBe(3600) // 60 minutes * 60 seconds
  })

  it('updates values correctly', () => {
    let contextValues
    function TestComponent() {
      contextValues = useAssessment()
      return null
    }

    render(
      <AssessmentProvider>
        <TestComponent />
      </AssessmentProvider>
    )

    act(() => {
      contextValues.setCurrentQuestionIndex(1)
      contextValues.setAnswers({ 0: 'test answer' })
      contextValues.setMarkedForReview({ 0: true })
      contextValues.setRemainingTime(3000)
    })

    expect(contextValues.currentQuestionIndex).toBe(1)
    expect(contextValues.answers).toEqual({ 0: 'test answer' })
    expect(contextValues.markedForReview).toEqual({ 0: true })
    expect(contextValues.remainingTime).toBe(3000)
  })
})

