import React from 'react'
import s from './Header.module.scss'
import { Space, Typography } from 'antd'
import editSvg from '../../../../../public/svg/edit.svg'
import {
  EyeInvisibleOutlined,
  MinusOutlined,
  CloseOutlined
} from '@ant-design/icons'

const { Paragraph, Text } = Typography

const Header = () => {
  return (
    <div className={s.cont}>
      <div className={s.info}>
        <div className={s.group}>
          <Text>Грузовая группа #1</Text>
        </div>
        <Paragraph
          editable={{ icon: <img src={editSvg.src} /> }}
          className={s.fix}
        >
          Название компании 1
        </Paragraph>
      </div>
      <Space size={'middle'} className={s.ico}>
        <MinusOutlined />
        <EyeInvisibleOutlined />
        <CloseOutlined />
      </Space>
    </div>
  )
}

export default Header
