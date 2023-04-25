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

const { Title } = Typography

interface ParamProps {
  reset: UseFormReset<createCargo>
  dirtyFields: Partial<Readonly<any>>
  defaultValues: Readonly<any> | undefined
  color: string
  setColor: React.Dispatch<React.SetStateAction<string>>
}

const Param: React.FC<ParamProps> = ({
  reset,
  dirtyFields,
  defaultValues,
  color,
  setColor
}) => {
  const [isSelectColor, setIsSelectColor] = useState(false)
  const clearForm = () => {
    const resFields: any = {}
    Object.keys(dirtyFields).forEach((el: any) => {
      resFields[el] = ''
    })
    reset({ ...resFields, ...defaultValues })
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
        <img src={saveSvg.src} alt='' />
        <img src={reverseSvg.src} alt='' onClick={clearForm} />
        <img src={trashSvg.src} alt='' />
      </Space>
    </div>
  )
}

export default Param
