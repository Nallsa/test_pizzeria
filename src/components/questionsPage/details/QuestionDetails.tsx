import React from 'react'

import { IQuestion } from 'dto/questions.dto'

import jwtDecode from 'jwt-decode'
import moment from 'moment'

import { QuestionWrapper, QuestionInfo, Title } from './Styles.element'
import { useActions } from 'hooks/useActions'
import { useSelector } from 'react-redux'
import { RootState } from 'dataStore/state'
import Chip from 'components/chip'
import { ColorTypes } from 'components/chip/Styles.elements'

interface IQuestionDetailstProps {
  state?: IQuestion | null
}

const QuestionDetails: React.FC<IQuestionDetailstProps> = ({ state }) => {
  const { updateQuestion } = useActions()
  const { getAllUsers } = useActions()
  const { users } = useSelector((state: RootState) => state.users)

  const viewerUser = users?.filter(user => user.id === state?.viewerId)[0]

  React.useEffect(() => {
    getAllUsers()
  }, [])

  React.useEffect(() => {
    if (!state) return

    const token = localStorage.getItem('token')
    const decoded: any = jwtDecode(token!)

    if (state.is_viewed) return

    updateQuestion({ ...state, viewerId: decoded.id, is_viewed: true })
  }, [state])

  return (
    <QuestionWrapper>
      <QuestionInfo>
        <Title>Имя</Title> {state?.name}
      </QuestionInfo>
      <QuestionInfo>
        <Title>Номер телефона</Title> {state?.phone}
      </QuestionInfo>
      <QuestionInfo>
        <Title>Тема сообщения</Title> {state?.subject}
      </QuestionInfo>
      <QuestionInfo>
        <Title>id пиццерии</Title> {state?.pizzeria_id}
      </QuestionInfo>
      <QuestionInfo>
        <Title>Прочитано</Title>{' '}
        <Chip style={{width: 'fit-content'}} color={ColorTypes[state?.is_viewed ? 'light_blue' : 'red']}>
          {state?.is_viewed ? 'Прочитано' : 'Не прочитано'}
        </Chip>
      </QuestionInfo>
      <QuestionInfo>
        <Title>Согласие на обработку персональных данных</Title>
        {state?.is_agree ? 'Согласен' : 'Не согласен'}
      </QuestionInfo>
      <QuestionInfo>
        <Title>Посмотрел сообщение</Title>
        {viewerUser?.first_name} {viewerUser?.last_name}
      </QuestionInfo>
      <QuestionInfo>
        <Title>Дата создания</Title>
        {state?.create_at && (
          <>
            {moment(state?.create_at).format('L')} -{' '}
            {moment(state?.create_at).format('LT')}
          </>
        )}
      </QuestionInfo>
      <QuestionInfo>
        <Title>Дата редактирования</Title>
        {state?.update_at && (
          <>
            {moment(state?.update_at).format('L')} -{' '}
            {moment(state?.update_at).format('LT')}
          </>
        )}
      </QuestionInfo>
    </QuestionWrapper>
  )
}

export default QuestionDetails
