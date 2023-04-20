import React, { useState } from 'react'
import s from './Header.module.scss'
import { Space, Typography } from 'antd'
import editSvg from '../../../../../public/svg/edit.svg'
import {
  EyeInvisibleOutlined,
  MinusOutlined,
  CloseOutlined,
  EyeOutlined
} from '@ant-design/icons'
import classNames from 'classnames'

const { Paragraph, Text } = Typography

interface HeaderProps {
  isHidden: boolean
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<HeaderProps> = ({ isHidden, setIsHidden }) => {
  const [title, setTitle] = useState('Название компании 1')
  const [isHiddenTitle, setIsHiddenTitle] = useState(false)

  return (
    <div className={s.cont}>
      <div className={s.info}>
        <div
          className={classNames(s.group, { [s.group__hidden]: isHiddenTitle })}
        >
          <Text>
            {isHiddenTitle ? 'Грузовая группа отключена' : 'Грузовая группа #1'}
          </Text>
        </div>
        <Paragraph
          editable={{
            icon: <img src={editSvg.src} />,
            onChange: setTitle
          }}
          className={s.fix}
        >
          {title}
        </Paragraph>
      </div>
      <Space size={'middle'} className={s.ico}>
        <MinusOutlined onClick={() => setIsHidden((e) => !e)} />
        {isHiddenTitle ? (
          <EyeOutlined onClick={() => setIsHiddenTitle((e) => !e)} />
        ) : (
          <EyeInvisibleOutlined onClick={() => setIsHiddenTitle((e) => !e)} />
        )}
        <CloseOutlined />
      </Space>
    </div>
  )
}

export default Header
