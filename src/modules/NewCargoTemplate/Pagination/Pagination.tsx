import React from 'react'
import s from './Pagination.module.scss'
import { Pagination } from 'antd'
import { Button } from 'antd'

const Navigation = () => {
  return (
    <div className={s.cont}>
        <Pagination
          total={85}
          showSizeChanger={false}
          showQuickJumper
          showTotal={(total) => `Total ${total} items`}
        />
        <Button>Отменить</Button>
    </div>
  )
}

export default Navigation
