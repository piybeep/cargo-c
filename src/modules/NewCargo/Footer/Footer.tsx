import React from 'react'
import s from './Footer.module.scss'
import { Button } from 'antd'
import { useRouter } from 'next/router'

const Footer = () => {
  const nav=useRouter()
  return (
    <div className={s.cont}>
        <Button onClick={()=>nav.replace('/cargo')}>Отменить</Button>
        <Button type='primary' htmlType='submit'>Сохранить</Button>
    </div>
  )
}

export default Footer