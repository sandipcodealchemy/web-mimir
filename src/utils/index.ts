import { verify } from 'jsonwebtoken'

export const hasValue = (chkCondation: any, val1: any, val2: any) =>
  chkCondation ? val1 : val2

export const setInAsyncStorage = (key: string, value: any) => {
  return localStorage.setItem(key, JSON.stringify(value))
}

export const getFromAsync = (key: string) => {
  return localStorage?.getItem(key) || ''
}
export const verifyToken = (token?: string) => {
  return verify(token || '', process.env.JWT_HASH!) as { uid: string }
}
