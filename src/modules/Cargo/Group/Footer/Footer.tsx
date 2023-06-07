import React, { useEffect, useState } from 'react'
import s from './Footer.module.scss'
import { Button } from 'antd'
import {
  FileAddOutlined,
  PlusSquareOutlined,
  PlusSquareTwoTone
} from '@ant-design/icons'
import { useRouter } from 'next/router'
import { SaveSvg } from '@/public/svg/SaveSvg'

const Footer = ({
  groupId,
  projectId
}: {
  groupId: string
  projectId: string
}) => {
  const [clientWidth, setClientWidth] = useState(0)
  const nav = useRouter()

  useEffect(() => {
    setClientWidth(document?.documentElement.scrollWidth)
  }, [])

  return (
    <div className={s.cont}>
      {clientWidth > 460 ? (
        <>
          <Button icon={<FileAddOutlined />}>Из файла</Button>
          <Button
            type='primary'
            icon={<PlusSquareOutlined />}
            onClick={() =>
              nav.push(
                '/cargo/new?groupId=' + groupId + '&projectId=' + projectId
              )
            }
          >
            Добавить груз
          </Button>
          <Button
            icon={<SaveSvg />}
            className={s.button}
            onClick={() => nav.push(`cargo/new/template/${groupId}?projectId=${projectId}`)}
          >
            Из шаблонов
          </Button>
        </>
      ) : (
        <>
          <FileAddOutlined className={s.img} />
          <PlusSquareTwoTone
            className={s.img}
            onClick={() => nav.push('cargo/new')}
          />
          <SaveSvg
            onClick={() => nav.push(`cargo/new/template/${groupId}?projectId=${projectId}`)}
            style={{ width: 28, height: 28 }}
          />
        </>
      )}
    </div>
  )
}

export default Footer
