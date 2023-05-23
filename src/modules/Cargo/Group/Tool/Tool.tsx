import React from 'react'
import s from './Tool.module.scss'
import { Checkbox, Space } from 'antd'
import { Typography } from 'antd'
import { cargoCheckBox } from '../Group'
import { UseFormWatch } from 'react-hook-form'
import Image from 'next/image'
import { SaveSvg } from '@/public/svg/SaveSvg'
import IconReplace from '@/public/svg/IconReplace'
import IconTrash from '@/public/svg/IconTrash'

const { Text } = Typography

interface toolProps {
  indeterminate: any
  onCheckAllChange: any
  checkAll: any
}

const Tool: React.FC<toolProps> = ({
  indeterminate,
  onCheckAllChange,
  checkAll
}) => {
  return (
    <div className={s.cont}>
      <div className={s.select}>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
          children={<Text>Выбрать все</Text>}
        />
        {indeterminate||checkAll ? (
          <Space>
            <div className={s.toolEl}>
              <IconReplace />
              <Text style={{ color: '#1890FF' }}>Переместить</Text>
            </div>
            <div className={s.toolEl}>
              <SaveSvg />
              <Text style={{ color: '#1890FF' }}>Сохранить в шаблоны</Text>
            </div>
            <div className={s.toolEl}>
              <IconTrash />
              <Text style={{ color: '#1890FF' }}>Удалить</Text>
            </div>
          </Space>
        ) : (
          <></>
        )}
      </div>
      <Text>25 шт, 125 кг, 270 м3</Text>
    </div>
  )
}

export default Tool
