import React from 'react'
import s from './Footer.module.scss'
import { Button } from 'antd'
import { FileAddOutlined, PlusSquareOutlined } from '@ant-design/icons'
import saveSvg from '../../../../../public/svg/boxEl/saveB.svg'
import Image from 'next/image'

const Footer = () => {

  return (
    <div className={s.cont}>
      <Button icon={<FileAddOutlined />}>Из файла</Button>
      <Button type='primary' icon={<PlusSquareOutlined />}>
        Добавить груз
      </Button>
      <Button icon={<Image src={saveSvg.src} className={s.img} alt='' width={14} height={14} color='red'/>} className={s.button}>
        Из шаблонов
      </Button>
    </div>
  )
}

export default Footer
