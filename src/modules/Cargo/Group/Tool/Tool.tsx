import React from 'react'
import s from './Tool.module.scss'
import { Checkbox } from 'antd'
import { Typography } from 'antd'

const { Text } = Typography

interface toolProps {
  selectAll: (value: boolean) => void
}

const Tool: React.FC<toolProps> = ({ selectAll }) => {
  return (
    <div className={s.cont}>
      <div className={s.select}>
        <Checkbox onChange={(e) => selectAll(e.target.checked)} />
        <Text>Выбрать все</Text>
      </div>
      <Text>25 шт, 125 кг, 270 м3</Text>
    </div>
  )
}

export default Tool
