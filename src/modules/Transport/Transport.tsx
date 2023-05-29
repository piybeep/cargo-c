import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, Typography } from 'antd'

import { TransportProps } from './Transport.types'

import Icon from '@ant-design/icons/lib/components/Icon'

import s from './Transport.module.scss'

import { useSwipe } from '../../hook/useSwipe'

import IconAdd from '@/public/svg/IconAdd'
import IconShablon from '@/public/svg/IconShablon'
import { transportEntity, typeOfTransport } from '@/api/transport/type'
import Image from 'next/image'
import Menu from './Menu'
import { useGetTransport } from './hook/useGetTransport'

export function Transport({ ...props }: TransportProps) {
  const { Title, Text } = Typography

  const [windowWidth, setWindowWidth] = useState(false)

  const { data: transport, isLoading: isLoadingGet } = useGetTransport({
    tmp: false
  })

  const router = useRouter()

  useEffect(() => {
    if (window) {
      window.innerWidth > 660 ? setWindowWidth(false) : setWindowWidth(true)
    }
  }, [])

  // Swipe logic
  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    setSaveCurrentIndex,
    handleClick
  } = useSwipe(s.item)
  // Swipe logic

  const handleRemoveTransport = (id: string) => {
    //remove the transport
    setSaveCurrentIndex(undefined)
  }

  const handleClickItem = (id: string) => {
    handleClick()
    router.push('/transport/config')
  }

  const addNewTransport = () => {
    router.push('/transport/config')
  }

  const getIcon = (type: typeOfTransport) => {
    switch (type) {
      case 'Грузовой автомобиль':
        return './car.svg'
      case 'Морской контейнер':
        return './ship.svg'
      case 'Паллет':
        return './pallet.svg'
      case 'Складская площадь':
        return './stock.svg'
      default:
        return './car.svg'
    }
  }

  const getInfo = (data: transportEntity) => {
    let volume = ''

    if (data.sizeUnit === 'м') {
      volume += data.width * data.height * data.length
    } else if (data.sizeUnit === 'см') {
      volume += (data.width * data.height * data.length) / 100
    } else {
      volume += (data.width * data.height * data.length) / 1000
    }

    return (
      data.type +
      ' ' +
      data.length +
      ' x ' +
      data.width +
      ' x ' +
      data.height +
      ' ' +
      data.sizeUnit +
      ', ' +
      data.weight +
      ' ' +
      data.weightUnit +
      ', ' +
      volume +
      ' м2'
    )
  }

  if (isLoadingGet) return <></>

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Title level={5}>Список грузовых площадей</Title>
      </div>

      <div className={s.list}>
        {transport?.pages.map((el) =>
          el?.data?.map((elem) => (
            <div key={elem.id} className={s.item__wrapper}>
              <div
                className={s.item}
                onClick={() => handleClickItem(elem.id)}
                onTouchStart={(e) =>
                  windowWidth && handleTouchStart(e, elem.id)
                }
                onTouchMove={(e) =>
                  windowWidth && handleTouchMove(e, '' + elem.id)
                }
                onTouchEnd={() => windowWidth && handleTouchEnd('' + elem.id)}
                id={'' + elem.id}
              >
                <Image
                  className={s.item__icon}
                  src={getIcon(elem.type)}
                  width={40}
                  height={40}
                  alt={elem.type}
                />
                <div className={s.item__info}>
                  <Title level={5}>{elem.name}</Title>
                  <Text>{getInfo(elem)}</Text>
                </div>
                <div className={s.item__menu}>
                  <Menu
                    id={elem.id}
                    handleRemoveTransport={handleRemoveTransport}
                  />
                </div>
              </div>
              <div className={s.list__menu}>
                <Menu
                  id={elem.id}
                  handleRemoveTransport={handleRemoveTransport}
                />
              </div>
            </div>
          ))
        )}
      </div>
      <div className={s.buttons}>
        <Button
          onClick={() => addNewTransport()}
          className={s.buttons__button}
          type='primary'
        >
          <Icon className={s.buttons__icon} component={IconAdd} />
          Добавить транспорт вручную
        </Button>
        <Link href='/transport/template'>
          <Button
            className={s.buttons__button}
            type='primary'
            style={{ backgroundColor: '#389E0D' }}
          >
            <Icon className={s.buttons__icon} component={IconShablon} />
            Добавить из шаблона
          </Button>
        </Link>
      </div>
    </div>
  )
}
