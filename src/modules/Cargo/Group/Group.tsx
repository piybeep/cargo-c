import React from 'react'
import s from './Group.module.scss'
import GroupEl from './GroupEl/GroupEl'
import Header from './Header/Header'
import Tool from './Tool/Tool'
import Footer from './Footer/Footer'

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
      <Footer/>
    </div>
  )
}

export default Group
