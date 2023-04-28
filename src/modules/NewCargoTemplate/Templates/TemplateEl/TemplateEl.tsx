import React, { useEffect, useState } from 'react'
import s from './TemplateEl.module.scss'
import { RightCircleTwoTone } from '@ant-design/icons'
import boxSvg from '@/public/svg/box/box1blue.svg'
import { Space, Typography } from 'antd'
import Image from 'next/image'
import trashSvg from '../../../../../public/svg/boxEl/trash.svg'

const { Text, Title } = Typography

interface TemplateElProps {
  ind: number
  handleTouchStart: (e: React.TouchEvent<HTMLDivElement>, id: string) => void
  handleTouchMove: (e: React.TouchEvent<HTMLDivElement>, id: string) => void
  handleTouchEnd: (id: string) => void
  el: any
}

const TemplateEl: React.FC<TemplateElProps> = ({
  handleTouchEnd,
  handleTouchMove,
  handleTouchStart,
  ind,
  el
}) => {
  const [clientWidth, setClientWidth] = useState(0)

  useEffect(() => {
    setClientWidth(document?.documentElement.scrollWidth)
  }, [])
  return (
    <div className={s.wrapperCont}>
      <div
        className={s.cont}
        onTouchStart={(e) => handleTouchStart(e, el.name)}
        onTouchMove={(e) => handleTouchMove(e, el.name)}
        onTouchEnd={() => handleTouchEnd(el.name)}
        id={el.name}
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
        <Space align='center'>
          {clientWidth > 460 ? (
            <Image
              alt='Удалить'
              width={28}
              height={28}
              className={s.img}
              src={trashSvg.src}
            />
          ) : (
            <></>
          )}
          <RightCircleTwoTone className={s.img} />
        </Space>
      </div>
      <div className={s.img_mod}>
        <Image
          alt='Удалить'
          width={24}
          height={24}
          className={s.img}
          src={trashSvg.src}
        />
      </div>
    </div>
  )
}

export default TemplateEl
