import React from 'react'
import s from './Group.module.scss'
import Header from './Header/Header'
import Tool from './Tool/Tool'

const Group = () => {
  return (
    <div className={s.cont}>
        <Header/>
        <Tool/>
    </div>
  )
}

export default Group