import React, { useEffect, useState } from 'react'
import s from './Pagination.module.scss'
import { Pagination } from 'antd'
import { Button } from 'antd'
import { useRouter } from 'next/router'

const Navigation = () => {
  const [clientWidth, setClientWidth] = useState(0)
  const nav = useRouter()

  useEffect(() => {
    setClientWidth(document?.documentElement.scrollWidth)
  }, [])

  return (
    <div className={s.cont}>
      {clientWidth > 515 ? (
        <>
          <Pagination
            total={85}
            showSizeChanger={false}
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
          />
          <Button onClick={() => nav.replace('/cargo')}>Отменить</Button>
        </>
      ) : (
        <>
          <Button onClick={() => nav.replace('/cargo')}>Отменить</Button>
          <Pagination simple defaultCurrent={2} total={50} />
        </>
      )}
    </div>
  )
}

export default Navigation
