import React from 'react'
import s from './TemplateEl.module.scss'
import { RightCircleTwoTone } from '@ant-design/icons'
import boxSvg from '@/img/svg/box/box1blue.svg'
import { Typography } from 'antd'

const { Text, Title } = Typography

const TemplateEl = () => {
  return (
    <div className={s.cont}>
      <div className={s.wrapper}>
        <img src={boxSvg.src} />
        <div className={s.text}>
          <Title level={5}>Ящик 40м2</Title>
          <Text type='secondary'>Ящик 12039 х 2330 х 2693 мм, 26840 кг, 5 шт.</Text>
        </div>
      </div>
      <RightCircleTwoTone className={s.img}/>
    </div>
  )
}

export default TemplateEl
