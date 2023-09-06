export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      addAssignment: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      addClassName: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      addGrading: {
        Row: {
          assignId: string | null
          assignmentQuestion: string | null
          classId: string | null
          created_at: string
          id: string
          studentName: string | null
          studentResponse: string | null
        }
        Insert: {
          assignId?: string | null
          assignmentQuestion?: string | null
          classId?: string | null
          created_at?: string
          id?: string
          studentName?: string | null
          studentResponse?: string | null
        }
        Update: {
          assignId?: string | null
          assignmentQuestion?: string | null
          classId?: string | null
          created_at?: string
          id?: string
          studentName?: string | null
          studentResponse?: string | null
        }
        Relationships: []
      }
      addNewLesson: {
        Row: {
          created_at: string
          GptOutput: string | null
          GradeLevel: string | null
          id: string
          LessonTopic: string | null
          Subject: string | null
        }
        Insert: {
          created_at?: string
          GptOutput?: string | null
          GradeLevel?: string | null
          id?: string
          LessonTopic?: string | null
          Subject?: string | null
        }
        Update: {
          created_at?: string
          GptOutput?: string | null
          GradeLevel?: string | null
          id?: string
          LessonTopic?: string | null
          Subject?: string | null
        }
        Relationships: []
      }
      assignments: {
        Row: {
          class_id: string | null
          created_at: string
          id: number
          isDelete: boolean | null
          name: string
          question_id: string[] | null
        }
        Insert: {
          class_id?: string | null
          created_at?: string
          id?: number
          isDelete?: boolean | null
          name: string
          question_id?: string[] | null
        }
        Update: {
          class_id?: string | null
          created_at?: string
          id?: number
          isDelete?: boolean | null
          name?: string
          question_id?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: 'assignments_class_id_fkey'
            columns: ['class_id']
            referencedRelation: 'classes'
            referencedColumns: ['id']
          },
        ]
      }
      class_students: {
        Row: {
          class_id: string
          created_at: string
          id: string
          student_id: string
        }
        Insert: {
          class_id: string
          created_at?: string
          id?: string
          student_id: string
        }
        Update: {
          class_id?: string
          created_at?: string
          id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'class_students_class_id_fkey'
            columns: ['class_id']
            referencedRelation: 'classes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'class_students_student_id_fkey'
            columns: ['student_id']
            referencedRelation: 'students'
            referencedColumns: ['id']
          },
        ]
      }
      classes: {
        Row: {
          created_at: string
          id: string
          isDelete: boolean
          name: string | null
          teacher_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          isDelete?: boolean
          name?: string | null
          teacher_id: string
        }
        Update: {
          created_at?: string
          id?: string
          isDelete?: boolean
          name?: string | null
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'classes_teacher_id_fkey'
            columns: ['teacher_id']
            referencedRelation: 'teachers'
            referencedColumns: ['id']
          },
        ]
      }
      grade_levels: {
        Row: {
          created_at: string
          id: string
          isDelete: boolean
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          isDelete?: boolean
          name?: string
        }
        Update: {
          created_at?: string
          id?: string
          isDelete?: boolean
          name?: string
        }
        Relationships: []
      }
      lesson_plans: {
        Row: {
          content: string
          created_at: string
          grade_level: string
          id: number
          subject: string
          teacher_id: string
          topic: string
        }
        Insert: {
          content: string
          created_at?: string
          grade_level: string
          id?: number
          subject: string
          teacher_id: string
          topic: string
        }
        Update: {
          content?: string
          created_at?: string
          grade_level?: string
          id?: number
          subject?: string
          teacher_id?: string
          topic?: string
        }
        Relationships: [
          {
            foreignKeyName: 'lesson_plans_teacher_id_fkey'
            columns: ['teacher_id']
            referencedRelation: 'teachers'
            referencedColumns: ['id']
          },
        ]
      }
      students: {
        Row: {
          created_at: string
          id: string
          isDelete: boolean
          name: string | null
          teacher_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          isDelete?: boolean
          name?: string | null
          teacher_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          isDelete?: boolean
          name?: string | null
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'students_teacher_id_fkey'
            columns: ['teacher_id']
            referencedRelation: 'teachers'
            referencedColumns: ['id']
          },
        ]
      }
      submissions: {
        Row: {
          created_at: string
          feedback: string
          id: string
          question_id: string
          response: string
          student_id: string
        }
        Insert: {
          created_at?: string
          feedback: string
          id?: string
          question_id: string
          response: string
          student_id: string
        }
        Update: {
          created_at?: string
          feedback?: string
          id?: string
          question_id?: string
          response?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'submissions_question_id_fkey'
            columns: ['question_id']
            referencedRelation: 'test_questions'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'submissions_student_id_fkey'
            columns: ['student_id']
            referencedRelation: 'students'
            referencedColumns: ['id']
          },
        ]
      }
      teachers: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      test_questions: {
        Row: {
          class_id: string
          content: string
          created_at: string
          id: string
          isDelete: boolean
          teacher_id: string
        }
        Insert: {
          class_id: string
          content: string
          created_at?: string
          id?: string
          isDelete?: boolean
          teacher_id: string
        }
        Update: {
          class_id?: string
          content?: string
          created_at?: string
          id?: string
          isDelete?: boolean
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'test_questions_class_id_fkey'
            columns: ['class_id']
            referencedRelation: 'classes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'test_questions_teacher_id_fkey'
            columns: ['teacher_id']
            referencedRelation: 'teachers'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
