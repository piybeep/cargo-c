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

const { Text, Title } = Typography

interface GroupElProps {
  ind: number
  handleTouchStart: (e: React.TouchEvent<HTMLDivElement>, ind: number) => void
  handleTouchMove: (e: React.TouchEvent<HTMLDivElement>, ind: number) => void
  handleTouchEnd: (ind: number) => void
}

const GroupEl: React.FC<GroupElProps> = ({
  ind,
  handleTouchEnd,
  handleTouchMove,
  handleTouchStart
}) => {
  const [clientWidth, setClientWidth] = useState(0)
  console.log(clientWidth)

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
        <Checkbox className={s.checkBox} />
        <div className={s.wrapper}>
          <div className={s.el}>
            <div className={s.checkBox_mod}>
              <label htmlFor={`checkBox${ind}`} className={s.ico}>
                <img src={box1SVG.src} alt='box' />
              </label>
              <Checkbox className={s.checkBox} id={`checkBox${ind}`} disabled={clientWidth>460}/>
            </div>
            <div className={s.info}>
              <Title level={5} className={s.title}>1. Новое место - 1</Title>
              <Text type='secondary' strong className={s.text}>
                Ящик 1200 х 500 х 600 мм, 12 кг, 5 шт.
              </Text>
              <div className={s.info__icons}>
                <img src={listSvg.src} />
                <PlusOutlined />
                <img src={arrowXSvg.src} />
                <img src={arrowYSvg.src} />
              </div>
            </div>
          </div>
          <div className={s.icons}>
            <img src={saveSvg.src} />
            <img src={listFrSvg.src} />
            <img src={trashSvg.src} />
          </div>
        </div>
      </div>
      <div className={s.menu}>
        <img src={saveSvg.src} />
        <img src={listFrSvg.src} />
        <img src={trashSvg.src} />
      </div>
    </div>
  )
}

export default GroupEl
