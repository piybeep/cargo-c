import React from 'react'
import s from './Tool.module.scss'
import { Checkbox } from 'antd'
import { Typography } from 'antd'
import { cargoCheckBox } from '../Group'
import { UseFormWatch } from 'react-hook-form'

const { Text } = Typography

interface toolProps {
  selectAll: (value: boolean) => void
  watch: UseFormWatch<cargoCheckBox>
}

const Tool: React.FC<toolProps> = ({ selectAll, watch }) => {
  const isCheckAll =
    watch('cargo').filter((el) => el.select).length === watch('cargo').length

  return (
    <div className={s.cont}>
      <div className={s.select}>
        <Checkbox
          onChange={(e) => selectAll(e.target.checked)}
          value={isCheckAll}
          checked={isCheckAll}
        />
        <Text>Выбрать все</Text>
      </div>
      <Text>25 шт, 125 кг, 270 м3</Text>
    </div>
  )
}

export default Tool
