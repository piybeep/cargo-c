import React from 'react'
import s from './Footer.module.scss'
import { Button } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons'

const Footer = () => {
  return (
    <div className={s.cont}>
      <Button icon={<PlusSquareOutlined/>}>Добавить грузовую группу</Button>
    </div>
  )
}

export default Footer
