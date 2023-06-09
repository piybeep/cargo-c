import React, { useEffect, useState } from 'react'
import s from './Pagination.module.scss'
import { Pagination } from 'antd'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import { navigationProps } from './type'

const Navigation: React.FC<navigationProps> = ({
  countItem,
  currentPage,
  changePage
}) => {
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
            total={countItem}
            showSizeChanger={false}
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
            current={currentPage ? currentPage : 1}
            onChange={changePage}
          />
          <Button onClick={() => nav.replace('/cargo')}>Отменить</Button>
        </>
      ) : (
        <>
          <Button onClick={() => nav.replace('/cargo')}>Отменить</Button>
          <Pagination simple total={countItem} />
        </>
      )}
    </div>
  )
}

export default Navigation
