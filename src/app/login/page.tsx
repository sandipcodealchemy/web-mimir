'use client'

import { Input } from '@/app/components/Input'
import { API_CONSTANT } from '@/constants/ApiConstant'
import { AppConstant, MSG, I_TYPE, ROUTE } from '@/constants/AppConstant'
import Api from '@/service/ApiServices'
import { setInAsyncStorage } from '@/utils/index'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../components/Button'

const supabase = createClient(
  'https://jvcvhatxolqvdramanhr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2Y3ZoYXR4b2xxdmRyYW1hbmhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI4NTEwNzgsImV4cCI6MjAwODQyNzA3OH0.e5FXpmsJHif2sHnIY2oSDfxKBJvTv7QClBfbAIv-ZeA',
  {
    auth: { persistSession: false },
  }
)

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      const user_id = res.data.user?.identities?.[0].user_id
      const identity_data = res.data.user?.identities?.[0]?.identity_data
      if (user_id) {
        Api.post('/googleLogin', {
          id: user_id,
          email: identity_data?.email,
          name: identity_data?.full_name,
        })
          .then((res) => {
            router.replace('/')
            router.refresh()
            toast.success('Login successfully')
          })
          .catch((e) => {})
      }
    })
  }, [])

  const googleAuth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
  }

  return (
    <div className="m-auto flex h-screen w-full flex-col items-center justify-center bg-bgColor">
      <div className=" w-[596px] rounded-[22px] bg-white px-[68px] shadow-[0px_0px_10px_0px_#2C2C2C0F]">
        <div className="mb-[36px] mt-[38px] flex flex-col items-center">
          <div className="h-[59px] w-[220px] bg-logoBG"></div>
        </div>
        <p className="text_RB_28 mb-[44px] text-center text-Ellipse2001">
          {AppConstant.LOGIN_MIMIR}
        </p>

        <div className="mb-[44px] mt-[32px]">
          <Button
            title={'continue with google'}
            onClick={() => {
              googleAuth()
            }}
            loading={loading}
            className="!border-Ellipse1102 !bg-Ellipse1101"
          />
        </div>
      </div>
    </div>
  )
}
