import { Checkbox } from 'antd'
import React, { useEffect, useState } from 'react'
import s from './GroupEl.module.scss'
import box1SVG from '../../../../../public/svg/box/box1.svg'
import { Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
//img
import listSvg from '../../../../../public/svg/boxEl/list.svg'
import arrowXSvg from '../../../../../public/svg/boxEl/arrowX.svg'
import arrowYSvg from '../../../../../public/svg/boxEl/arrowY.svg'
import saveSvg from '../../../../../public/svg/boxEl/save.svg'
import listFrSvg from '../../../../../public/svg/boxEl/listFront.svg'
import trashSvg from '../../../../../public/svg/boxEl/trash.svg'
import { Control, Controller, UseFormRegister } from 'react-hook-form'
import { cargoCheckBox } from '../Group'
import Image from 'next/image'

const { Text, Title } = Typography

interface GroupElProps {
  ind: number
  handleTouchStart: (e: React.TouchEvent<HTMLDivElement>, ind: number) => void
  handleTouchMove: (e: React.TouchEvent<HTMLDivElement>, ind: number) => void
  handleTouchEnd: (ind: number) => void
  el: any
  //ПЕРЕДЕЛАТЬ ТИП
  register: UseFormRegister<any>
  control: Control<cargoCheckBox, any>
}

const GroupEl: React.FC<GroupElProps> = ({
  ind,
  handleTouchEnd,
  handleTouchMove,
  handleTouchStart,
  el,
  register,
  control
}) => {
  const [clientWidth, setClientWidth] = useState(0)

  useEffect(() => {
    setClientWidth(document?.documentElement.scrollWidth)
  }, [])

  return (
    <div className={s.wrapperCont}>
      <div
        className={s.cont}
        onTouchStart={(e) => handleTouchStart(e, ind)}
        onTouchMove={(e) => handleTouchMove(e, ind)}
        onTouchEnd={() => handleTouchEnd(ind)}
      >
        <Controller
          control={control}
          name={`cargo.${ind}.select`}
          render={({ field }) => (
            <Checkbox
              key={field.name}
              className={s.checkBox}
              {...field}
              checked={field.value}
            />
          )}
        />
        <div className={s.wrapper}>
          <div className={s.el}>
            <div className={s.checkBox_mod}>
              <label htmlFor={`checkBox${ind}`} className={s.ico}>
                <Image width={25} height={25} src={box1SVG.src} alt='Ящик' />
              </label>
              <Checkbox
                className={s.checkBox}
                id={`checkBox${ind}`}
                disabled={clientWidth > 460}
              />
            </div>
            <div className={s.info}>
              <Title level={5} className={s.title}>
                1. Новое место - 1
              </Title>
              <Text type='secondary' strong className={s.text}>
                Ящик 1200 х 500 х 600 мм, 12 кг, 5 шт.
              </Text>
              <div className={s.info__icons}>
                <Image width={16} height={16} src={listSvg.src} alt='ярусы' />
                <PlusOutlined alt='нагрузка' />
                <Image width={16} height={16} src={arrowXSvg.src} alt='поворот' />
                <Image width={16} height={16} src={arrowYSvg.src} alt='кантирование' />
              </div>
            </div>
          </div>
          <div className={s.icons}>
            <Image src={saveSvg.src} alt='сохранить' width={24} height={24} />
            <Image src={listFrSvg.src} alt='клонировать' width={24} height={24} />
            <Image src={trashSvg.src} alt='удалить' width={24} height={24} />
          </div>
        </div>
      </div>
      <div className={s.menu}>
        <Image src={saveSvg.src} alt='сохранить' width={24} height={24} />
        <Image src={listFrSvg.src} alt='клонировать' width={24} height={24} />
        <Image src={trashSvg.src} alt='удалить' width={24} height={24} />
      </div>
    </div>
  )
}

export default GroupEl
