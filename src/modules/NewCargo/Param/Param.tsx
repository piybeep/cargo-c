import React from 'react'
import s from './Param.module.scss'
import { Space, Typography } from 'antd'
import saveSvg from '@/img/svg/boxEl/save.svg'
import trashSvg from '@/img/svg/boxEl/trash.svg'
import reverseSvg from '@/img/svg/boxEl/reverse.svg'


const { Title } = Typography

const Param = () => {
  return (
    <div className={s.cont}>
      <Title level={5}>Параметры</Title>
      <Space align='center' size={20}>
        <img src={saveSvg.src} alt="" />
        <img src={reverseSvg.src} alt="" />
        <img src={trashSvg.src} alt="" />
      </Space>
    </div>
  )
}

export default Param