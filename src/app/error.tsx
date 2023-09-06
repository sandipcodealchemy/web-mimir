'use client'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h2>something want wrong</h2>
      <Link href="/" className="">
        Return Home
      </Link>
    </div>
  )
}
