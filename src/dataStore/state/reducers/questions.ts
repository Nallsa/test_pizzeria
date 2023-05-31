import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { IQuestion, IQuestionsState } from 'dto/questions.dto'
import QuestionsService from 'dataStore/service/questions.service'

const getAllQuestions = createAsyncThunk(
  //action type string
  'orders/getAllQuestions',
  // callback function
  async thunkAPI => {
    try {
      const response = await QuestionsService.getAllQuestions()
      return response.data
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`)
      } else {
        toast.error(`${error?.statusText}`)
      }
    }
  }
)

const updateQuestion = createAsyncThunk(
  //action type string
  'orders/updateQuestion',
  // callback function
  async (data: any, thunkAPI) => {
    try {
      const response = await QuestionsService.updateQuestion(data)
      return response.data
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(`${error?.data?.message}`)
      } else {
        toast.error(`${error?.statusText}`)
      }
    }
  }
)

const initialState: IQuestionsState = {
  questions: [],
}

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getAllQuestions.fulfilled, (state, action) => {
      if (action.payload) {
        state.questions = action.payload
      }
    })
    builder.addCase(updateQuestion.fulfilled, (state, action) => {
      if (action.payload) {
        state.questions = state.questions.map(i =>
          i.id === action.payload?.id ? action.payload : i
        ) as IQuestion[]
      }
    })
  },
})

// Action creators are generated for each case reducer function
export const questionsActions: any = {
  ...questionsSlice.actions,
  getAllQuestions,
  updateQuestion,
}

export default questionsSlice.reducer
