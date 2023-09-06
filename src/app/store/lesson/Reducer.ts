'use client'

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lessonList: [],
  lesson: {
    subject: '',
    lessonTopic: '',
    gradeLevel: '',
  },
}

const lessonSlice = createSlice({
  name: 'lessonData',
  initialState,
  reducers: {
    setLessonList(state, action) {
      state.lessonList = action.payload
    },
    setLessonDetail(state, action) {
      state.lesson = action.payload
    },
  },
})

export const { setLessonList, setLessonDetail } = lessonSlice.actions
export default lessonSlice
