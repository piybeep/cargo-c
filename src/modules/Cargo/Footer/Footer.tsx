import React from 'react'
import s from './Footer.module.scss'
import { Button } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons'

interface FooterProps {
  createGroup: () => void
  isLoadingCreate: boolean
}

const Footer = ({ createGroup, isLoadingCreate }: FooterProps) => {
  return (
    <div className={s.cont}>
      <Button
        icon={<PlusSquareOutlined />}
        onClick={createGroup}
        loading={isLoadingCreate}
        disabled={isLoadingCreate}
      >
        Добавить грузовую группу
      </Button>
    </div>
  )
}

export default Footer
