import React, { useEffect, useState } from 'react'
import s from './Footer.module.scss'
import { Button } from 'antd'
import {
  FileAddOutlined,
  PlusSquareOutlined,
  PlusSquareTwoTone
} from '@ant-design/icons'
import { useRouter } from 'next/router'
import { SaveSvg } from '@/assets/svgComponent/SaveSvg'

const Footer = () => {
  const [clientWidth, setClientWidth] = useState(0)
  const nav=useRouter()

  useEffect(() => {
    setClientWidth(document?.documentElement.scrollWidth)
  }, [])

  return (
    <div className={s.cont}>
      {clientWidth > 460 ? (
        <>
          <Button icon={<FileAddOutlined />}>Из файла</Button>
          <Button type='primary' icon={<PlusSquareOutlined />} onClick={()=>nav.push('cargo/new')}>
            Добавить груз
          </Button>
          <Button
            icon={
              <SaveSvg/>
            }
            className={s.button}
            onClick={()=>nav.push('cargo/new/template')}
          >
            Из шаблонов
          </Button>
        </>
      ) : (
        <>
          <FileAddOutlined className={s.img}/>
          <PlusSquareTwoTone className={s.img} />
          <SaveSvg/>
        </>
      )}
    </div>
  )
}

export default Footer
