import React, { useEffect, useState } from 'react'
import s from './Footer.module.scss'
import { Button } from 'antd'
import {
  FileAddOutlined,
  PlusSquareOutlined,
  PlusSquareTwoTone
} from '@ant-design/icons'
import saveSvg from '../../../../../public/svg/boxEl/saveB.svg'
import Image from 'next/image'

const Footer = () => {
  const [clientWidth, setClientWidth] = useState(0)
  console.log(clientWidth)

  useEffect(() => {
    setClientWidth(document?.documentElement.scrollWidth)
  }, [])

  return (
    <div className={s.cont}>
      {clientWidth > 460 ? (
        <>
          <Button icon={<FileAddOutlined />}>Из файла</Button>
          <Button type='primary' icon={<PlusSquareOutlined />}>
            Добавить груз
          </Button>
          <Button
            icon={
              <Image
                src={saveSvg.src}
                className={s.img}
                alt=''
                width={14}
                height={14}
                color='red'
              />
            }
            className={s.button}
          >
            Из шаблонов
          </Button>
        </>
      ) : (
        <>
          <FileAddOutlined className={s.img}/>
          <PlusSquareTwoTone className={s.img} />
          <Image
            src={saveSvg.src}
            className={s.img}
            alt=''
            width={28}
            height={28}
            color='red'
          />
        </>
      )}
    </div>
  )
}

export default Footer
