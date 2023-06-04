import React from 'react'
import s from './Footer.module.scss'
import { Button } from 'antd'
import { useRouter } from 'next/router'

const Footer = ({isLoading,isLoadingEdit}:{isLoading:boolean,isLoadingEdit:boolean}) => {
  const nav=useRouter()
  return (
    <div className={s.cont}>
        <Button onClick={()=>nav.back()}>Отменить</Button>
        <Button type='primary' htmlType='submit' loading={isLoading||isLoadingEdit}>Сохранить</Button>
    </div>
  )
}

export default Footer