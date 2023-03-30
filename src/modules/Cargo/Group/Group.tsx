import React from 'react'
import s from './Group.module.scss'
import GroupEl from './GroupEl/GroupEl'
import Header from './Header/Header'
import Tool from './Tool/Tool'

const Group = () => {
  return (
    <div className={s.cont}>
      <Header />
      <Tool />
      <div className={s.wrapper}>
        <GroupEl />
        <GroupEl />
        <GroupEl />
        <GroupEl />
        <GroupEl />
      </div>
    </div>
  )
}

export default Group
