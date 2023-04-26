import React from 'react'
import s from './TemplateEl.module.scss'
import { RightCircleTwoTone } from '@ant-design/icons'
import boxSvg from '@/public/svg/box/box1blue.svg'
import { Typography } from 'antd'
import Image from 'next/image'

const { Text, Title } = Typography

interface TemplateElProps {
  ind: number
  handleTouchStart: (e: React.TouchEvent<HTMLDivElement>, ind: number) => void
  handleTouchMove: (e: React.TouchEvent<HTMLDivElement>, ind: number) => void
  handleTouchEnd: (ind: number) => void
}

const TemplateEl: React.FC<TemplateElProps> = ({
  handleTouchEnd,
  handleTouchMove,
  handleTouchStart,
  ind
}) => {
  return (
    <div className={s.wrapperCont}>
      <div
        className={s.cont}
        onTouchStart={(e) => handleTouchStart(e, ind)}
        onTouchMove={(e) => handleTouchMove(e, ind)}
        onTouchEnd={() => handleTouchEnd(ind)}
      >
        <div className={s.wrapper}>
          <Image alt='Ящик' width={26} height={30} src={boxSvg.src} />
          <div className={s.text}>
            <Title level={5}>Ящик 40м2</Title>
            <Text type='secondary'>
              Ящик 12039 х 2330 х 2693 мм, 26840 кг, 5 шт.
            </Text>
          </div>
        </div>
        <RightCircleTwoTone className={s.img} />
      </div>
      <RightCircleTwoTone className={s.img_mod} />
    </div>
  )
}

export default TemplateEl
