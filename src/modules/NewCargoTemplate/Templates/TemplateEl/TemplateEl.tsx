import React, { useEffect, useState } from 'react'
import s from './TemplateEl.module.scss'
import { RightCircleTwoTone } from '@ant-design/icons'
import BoxSvg from '../.././../.././../public/svg/IconBox'
import CartonSvg from '../.././../.././../public/svg/IconCarton'
import PalletSvg from '../.././../.././../public/svg/IconPallet'
import { Space, Typography } from 'antd'
import Image from 'next/image'
import trashSvg from '../../../../../public/svg/boxEl/trash.svg'
import { TemplateElProps } from './type'
import { useRouter } from 'next/router'

const { Text, Title } = Typography

const TemplateEl: React.FC<TemplateElProps> = ({
  handleTouchEnd,
  handleTouchMove,
  handleTouchStart,
  el,
  deleteCargo,
  groupId,
  projectId
}) => {
  const [clientWidth, setClientWidth] = useState(0)

  const roter = useRouter()

  useEffect(() => {
    setClientWidth(document?.documentElement.scrollWidth)
  }, [])

  const getInfo = () => {
    return (
      el.type +
      ' ' +
      el.length +
      ' x ' +
      el.width +
      ' x ' +
      el.height +
      ' ' +
      el.sizeUnit +
      ', ' +
      el.weight +
      ' ' +
      el.weightUnit +
      ', ' +
      el.count +
      ' шт.'
    )
  }

  const getImgForPackagingType = () => {
    if (el.type === 'Ящик') {
      return <BoxSvg style={{ width: 45, height: 40 }} className={s.iconType} />
    } else if (el.type === 'Коробка') {
      return (
        <CartonSvg style={{ width: 45, height: 40 }} className={s.iconType} />
      )
    } else {
      return (
        <PalletSvg style={{ width: 45, height: 40 }} className={s.iconType} />
      )
    }
  }

  return (
    <div className={s.wrapperCont}>
      <div
        className={s.cont}
        onTouchStart={(e) => handleTouchStart(e, el.name)}
        onTouchMove={(e) => handleTouchMove(e, el.name)}
        onTouchEnd={() => handleTouchEnd(el.name)}
        id={el.name}
        onClick={() =>
          roter.push(
            `/cargo/new/${el.id}?groupId=${groupId}&projectId=${projectId}&template=true`
          )
        }
      >
        <div className={s.wrapper}>
          {getImgForPackagingType()}
          <div className={s.text}>
            <Title level={5}>{el.name}</Title>
            <Text type='secondary'>{getInfo()}</Text>
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
              onClick={(e) => {
                e.stopPropagation()
                deleteCargo(el.id)
              }}
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
          onClick={(e) => {
            e.stopPropagation()
            deleteCargo(el.id)
          }}
        />
      </div>
    </div>
  )
}

export default TemplateEl
