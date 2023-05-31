import { IQuestion } from 'dto/questions.dto'
import { $api } from '../api'

export default class QuestionsService {
  // Получить все запросы пользователей
  static async getAllQuestions(): Promise<{ data: IQuestion[] }> {
    return $api.get('/questions')
  }

  static async updateQuestion(data: IQuestion): Promise<{ data: IQuestion }> {
    return $api.put('/questions', data)
  }
}
