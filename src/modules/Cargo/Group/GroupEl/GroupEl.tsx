import { Checkbox } from 'antd'
import React from 'react'
import s from './GroupEl.module.scss'
import box1SVG from '../../../../../public/svg/box/box1.svg'
import { Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
//img
import listSvg from '../../../../../public/svg/boxEl/list.svg'
import arrowXSvg from '../../../../../public/svg/boxEl/arrowX.svg'
import arrowYSvg from '../../../../../public/svg/boxEl/arrowY.svg'
import penSvg from '../../../../../public/svg/boxEl/pen.svg'
import saveSvg from '../../../../../public/svg/boxEl/save.svg'
import listFrSvg from '../../../../../public/svg/boxEl/listFront.svg'
import trashSvg from '../../../../../public/svg/boxEl/trash.svg'

const { Text, Title } = Typography

const GroupEl = () => {
  return (
    <div className={s.cont}>
      <Checkbox />
      <div className={s.wrapper}>
        <div className={s.el}>
          <div className={s.ico}>
            <img src={box1SVG.src} alt='box' />
          </div>
          <div className={s.info}>
            <Title level={5}>1. Новое место - 1</Title>
            <Text type='secondary' strong>
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
            <img src={penSvg.src} />
            <img src={saveSvg.src} />
            <img src={listFrSvg.src} />
            <img src={trashSvg.src} />
        </div>
      </div>
    </div>
  )
}

export default GroupEl
