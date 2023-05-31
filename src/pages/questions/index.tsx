import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import React from 'react'

import { useActions } from 'hooks/useActions'

import QuestionsPage from 'components/questionsPage'

const Questions: React.FC = () => {
  const { getAllQuestions } = useActions()

  useEffect(() => {
    getAllQuestions()
  }, [])

  return <QuestionsPage />
}

export default Questions
