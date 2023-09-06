import { NextResponse } from 'next/server'

export const throwError = (message?: string, status?: number) =>
  !message && !status
    ? NextResponse.error()
    : NextResponse.json({ message }, { status })
