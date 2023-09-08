// export const BASE_URL=  'http://localhost:3000/api'
// export const BASE_URL= 'https://web-mimir-orange.onrender.com/api'
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const API_CONSTANT = {
  LOGIN: '/login',
  GOOGLE_LOGIN: '/googleLogin',
  SIGNUP: '/signup',
  NEW_LESSON: '/newLesson',
  // GRADING: '/grading',
  GENERATE_LESSON_PLAN: '/generateLessonPlan',
  GENERATE_GRADE: '/generateGrade',
  CLASSES: '/classes',
  ASSIGNMENTS: '/assignments',
  LESSON_PLANS: '/lesson_plans',
  GRADE_LEVELS: '/grade_levels',
  STUDENTS: '/students',
  QUESTIONS: '/questions',
  ASSIGNMENT: '/assignment',
}

export { API_CONSTANT }
