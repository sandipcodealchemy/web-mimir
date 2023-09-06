export interface LessonType {
  id: string
  created_at: Date
  subject?: string
  topic?: string
  grade_level?: string
  content?: string
}

export interface SelectType {
  id: string
  created_at?: Date
  name?: string
  teacher_id?: string
}
export interface SelectTypeAssign {
  id: string
  created_at: Date
  name?: string
  class_id?: string
  teacher_id?: string
}
