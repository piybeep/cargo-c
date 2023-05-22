import React from 'react'
import s from './Footer.module.scss'
import { Button } from 'antd'
import { useRouter } from 'next/router'

const Footer = ({isLoading}:{isLoading:boolean}) => {
  const nav=useRouter()
  return (
    <div className={s.cont}>
        <Button onClick={()=>nav.back()}>Отменить</Button>
        <Button type='primary' htmlType='submit' loading={isLoading}>Сохранить</Button>
    </div>
  )
}

export default Footer