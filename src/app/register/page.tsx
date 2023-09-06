'use client'

import { Input } from '@/app/components/Input'
import { API_CONSTANT } from '@/constants/ApiConstant'
import { AppConstant, MSG, I_TYPE, ROUTE } from '@/constants/AppConstant'
import Api from '@/service/ApiServices'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../components/Button'

export default function Register() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const _onRegister = () => {
    if (password.trim() === confirmPassword.trim()) {
      setLoading(true)
      let data = {
        name: name,
        email: email,
        password: password,
      }

      Api.post(API_CONSTANT.SIGNUP, data)
        .then((res) => {
          router.replace(ROUTE.LOGIN)
          toast.success(MSG.SINGUP_SUCCESS)
        })
        .catch((error) => {
          console.log('HERE')
          toast.error(error.response.data.error)
        })
        .finally(() => setTimeout(() => setLoading(false)))
    } else {
      toast.error(MSG.PASSWORD_NOT_MATCH)
    }
  }

  return (
    <div className="m-auto flex h-screen w-full flex-col items-center justify-center bg-bgColor">
      <div className="h-[739px] w-[596px] rounded-[22px] bg-white px-[68px] shadow-[0px_0px_10px_0px_#2C2C2C0F]">
        <div className="mb-[36px] mt-[38px] flex flex-col items-center">
          <div className="h-[59px] w-[220px] bg-logoBG"></div>
        </div>
        <p className="text_RB_28 mb-[44px] text-center text-Ellipse2001">
          {AppConstant.CREATE_YOUR_MIMIR_ACCOUNT}
        </p>
        <Input
          title={AppConstant.NAME}
          type={I_TYPE.TEXT}
          value={name}
          setValue={setName}
        />
        <Input
          title={AppConstant.EMAIL}
          type={I_TYPE.TEXT}
          value={email}
          setValue={setEmail}
        />
        <Input
          title={AppConstant.PASSWORD}
          type={I_TYPE.PASSWORD}
          value={password}
          setValue={setPassword}
          IsEye
        />
        <Input
          title={AppConstant.CONFIRM_PASSWORD}
          type={I_TYPE.PASSWORD}
          value={confirmPassword}
          setValue={setConfirmPassword}
          IsEye
        />
        <div className="mt-[32px]">
          <Button
            title={AppConstant.CREATE_ACCOUNT}
            loading={loading}
            onClick={() => !loading && _onRegister()}
          />
          <div className="text_R_16 mt-[18px] flex justify-center">
            <p className="text-Ellipse0001">{AppConstant.ALREADY_ACCOUNT} </p>{' '}
            <p
              className="cursor-pointer px-1 text-Ellipse1213 underline"
              onClick={() => router.push(ROUTE.LOGIN)}
            >
              {AppConstant.LOG_IN}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
