import React from 'react'
import s from './GroupEl.module.scss'
import boxSVG from '../../../../../public/svg/newBox/box.svg'
import cartonSVG from '../../../../../public/svg/newBox/carton.svg'
import palletSVG from '../../../../../public/svg/newBox/pallet.svg'
import { Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
//img
import listSvg from '../../../../../public/svg/boxEl/list.svg'
import arrowXSvg from '../../../../../public/svg/boxEl/arrowX.svg'
import arrowYSvg from '../../../../../public/svg/boxEl/arrowY.svg'
import saveSvg from '../../../../../public/svg/boxEl/save.svg'
import listFrSvg from '../../../../../public/svg/boxEl/listFront.svg'
import trashSvg from '../../../../../public/svg/boxEl/trash.svg'
import Image from 'next/image'
import { cargoEntity } from '@/api/cargo/type'

const { Text, Title } = Typography

interface GroupElProps {
  handleTouchStart: (e: React.TouchEvent<HTMLDivElement>, id: string) => void
  handleTouchMove: (e: React.TouchEvent<HTMLDivElement>, id: string) => void
  handleTouchEnd: (id: string) => void
  handleClick: () => void
  el: cargoEntity
  groupIndex: string
  elId: string
}

const GroupEl: React.FC<GroupElProps> = ({
  handleTouchEnd,
  handleTouchMove,
  handleTouchStart,
  handleClick,
  el,
  groupIndex,
  elId
}) => {
  const getImgForPackagingType = () => {
    if (el.type === 'Ящик') {
      return <Image src={boxSVG.src} alt='Ящик' width={20} height={20} />
    } else if (el.type === 'Коробка') {
      return <Image src={cartonSVG.src} alt='Коробка' width={20} height={20} />
    } else {
      return <Image src={palletSVG.src} alt='Паллет' width={20} height={20} />
    }
  }

  const getInfo = () => {
    return (
      el.type +' '+
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

  return (
    <div className={s.wrapperCont}>
      <div
        className={s.cont + ' ' + `cont__` + groupIndex}
        onClick={() => handleClick()}
        onTouchStart={(e) => handleTouchStart(e, elId)}
        onTouchMove={(e) => handleTouchMove(e, elId)}
        onTouchEnd={() => handleTouchEnd(elId)}
        id={elId}
      >
        <div className={s.wrapper}>
          <div className={s.el}>
            <div className={s.ico} style={{ background: el.color }}>
              {getImgForPackagingType()}
            </div>
            <div className={s.info}>
              <Title level={5} className={s.title}>
                {el.name}
              </Title>
              <Text type='secondary' strong className={s.text}>
                {getInfo()}
              </Text>
              <div className={s.info__icons}>
              {getImgForPackagingType()}
                <PlusOutlined alt='нагрузка' />
                <Image
                  width={16}
                  height={16}
                  src={arrowXSvg.src}
                  alt='поворот'
                />
                <Image
                  width={16}
                  height={16}
                  src={arrowYSvg.src}
                  alt='кантирование'
                />
              </div>
            </div>
          </div>
          <div className={s.icons}>
            <Image src={saveSvg.src} alt='сохранить' width={24} height={24} />
            <Image
              src={listFrSvg.src}
              alt='клонировать'
              width={24}
              height={24}
            />
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
