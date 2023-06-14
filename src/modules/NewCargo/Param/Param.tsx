import React, { useState } from 'react'
import s from './Param.module.scss'
import { Space, Typography } from 'antd'
import saveSvg from '@/public/svg/boxEl/save.svg'
import trashSvg from '@/public/svg/boxEl/trash.svg'
import reverseSvg from '@/public/svg/boxEl/reverse.svg'
import { UseFormReset } from 'react-hook-form'
import { createCargo } from '../Body/type'
import { HexColorPicker } from 'react-colorful'
import classNames from 'classnames'
import { useThrottle } from '@/utils/useTrottle'
import Image from 'next/image'

const { Title } = Typography

interface ParamProps {
  reset: UseFormReset<createCargo>
  dirtyFields: Partial<Readonly<any>>
  defaultValues: Readonly<any> | undefined
  color: string
  setColor: React.Dispatch<React.SetStateAction<string>>
  existCargo: boolean
  saveTemplate: () => Promise<void>
  isLoading: boolean
  removeCargoModal: () => void
}

const Param: React.FC<ParamProps> = ({
  reset,
  dirtyFields,
  defaultValues,
  color,
  setColor,
  existCargo,
  saveTemplate,
  isLoading,
  removeCargoModal
}) => {
  const [isSelectColor, setIsSelectColor] = useState(false)
  const clearForm = () => {
    const resFields: any = {}
    if (existCargo && defaultValues) {
      Object.keys(defaultValues).forEach((el: any) => {
        resFields[el] = ''
      })
      reset({
        ...resFields,
        tiers: 'Да - максимально',
        type: 'Коробка',
        turn: true,
        tilting: true
      })
    } else {
      Object.keys(dirtyFields).forEach((el: any) => {
        resFields[el] = ''
      })
      reset({ ...resFields, ...defaultValues })
    }
  }

  const changeColor = useThrottle(setColor, 250)

  return (
    <div className={s.cont}>
      <Title level={5}>Параметры</Title>
      <Space align='center' size={20} className={s.ico}>
        <div
          className={s.color}
          onClick={() => setIsSelectColor((e) => !e)}
          style={{ background: color }}
        >
          <HexColorPicker
            color={color}
            onChange={changeColor}
            className={classNames(s.picker, { [s.picker_mod]: !isSelectColor })}
            onClick={(e) => e.stopPropagation()}
            onBlur={() => setIsSelectColor(false)}
            onFocus={() => setIsSelectColor(true)}
          />
        </div>
        {existCargo ? (
          <Image
            width={24}
            height={24}
            src={saveSvg.src}
            alt='Сохранить'
            onClick={() => !isLoading && saveTemplate()}
          />
        ) : (
          <></>
        )}
        <Image
          width={24}
          height={24}
          src={reverseSvg.src}
          alt='Очистить'
          onClick={clearForm}
        />
        {existCargo ? (
          <Image
            width={24}
            height={24}
            src={trashSvg.src}
            alt='Удалить'
            onClick={removeCargoModal}
          />
        ) : (
          <></>
        )}
      </Space>
    </div>
  )
}

export default Param
