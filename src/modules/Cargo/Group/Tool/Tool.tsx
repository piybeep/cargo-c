import React from 'react'
import s from './Tool.module.scss'
import { Checkbox } from 'antd'
import { Typography } from 'antd'

const { Text } = Typography

const Tool = () => {
  return (
    <div className={s.cont}>
      <div className={s.select}>
        <Checkbox />
        <Text>Выбрать все</Text>
      </div>
      <Text>25 шт, 125 кг, 270 м3</Text>
    </div>
  )
}

export default Tool
