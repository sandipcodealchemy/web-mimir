import { NextRequest, NextResponse } from 'next/server'
import { ROUTE } from './constants/AppConstant'

const isAuthPaths = (path: string) =>
  ['/login', '/register'].some((e) => path.includes(e))

export async function middleware(request: NextRequest) {
  if (!request.cookies.get('token')?.value) {
    if (!isAuthPaths(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(ROUTE.LOGIN, request?.url))
    }
  } else {
    if (isAuthPaths(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(ROUTE.HOME, request?.url))
    }

    if (request.nextUrl.pathname === '/api/logout') {
      const res = NextResponse.redirect(new URL(ROUTE.LOGIN, request?.url), {
        status: 301,
      })

      res.cookies.delete('token')
      return res
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/newLesson',
    '/lessonDetail',
    '/grading',
    '/students',
    '/gradeLevel',
    '/classes',
    '/assignments',
    '/questions',
    '/api/logout',
  ],
}

// import { NextRequest, NextResponse } from 'next/server';
// import { ROUTE } from './constants/AppConstant';

// const authPaths = ['/login', '/register'];

// export function middleware(request: NextRequest) {

//   if (!request.cookies.get('token')?.value) {
//     if (!authPaths.includes(request.nextUrl.pathname)) {
//       return NextResponse.redirect(new URL(ROUTE.LOGIN, request.url));
//     }
//   } else {
//     if (authPaths.includes(request.nextUrl.pathname)) {
//       return NextResponse.redirect(new URL(ROUTE.HOME, request.url));
//     } else if (request.nextUrl.pathname === '/api/logout') {
//       if (!authPaths.includes(request.nextUrl.pathname)) {
//         const res = NextResponse.redirect(new URL(ROUTE.LOGIN, request.url))
//         res.cookies.delete('token')
//         return res
//       }
//     }
//   }
// }

// // See "Matching Paths" below to learn more
// export const config = { matcher: ['/', '/login', '/register', '/newLesson', '/lessonDetail', '/grading', '/api/logout'] };
