import React from 'react'
import s from './Footer.module.scss'
import { Button } from 'antd'

const Footer = () => {
  return (
    <div className={s.cont}>
        <Button>Отменить</Button>
        <Button type='primary'>Сохранить</Button>
    </div>
  )
}

export default Footer