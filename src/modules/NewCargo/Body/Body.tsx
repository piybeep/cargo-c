import React from 'react'
import s from './Body.module.scss'
import { Space } from 'antd'
import { Radio } from 'antd'

const Body = () => {
  return (
    <div className={s.cont}>
      <div className={s.header}>
        <Radio.Group size='large'>
          <Radio value={1}>мм</Radio>
          <Radio value={2}>см</Radio>
          <Radio value={3}>м</Radio>
        </Radio.Group>
        <Radio.Group size='large'>
          <Radio value={1}>кг</Radio>
          <Radio value={2}>тн</Radio>
        </Radio.Group>
      </div>
      <div className={s.body}>
        <input type="text" className={s.firstInput}/><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" className={s.breakInput}/><input type="text" /><input type="text" />
      </div>
    </div>
  )
}

export default Body
