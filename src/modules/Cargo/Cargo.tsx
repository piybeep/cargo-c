import React from 'react'
import Header from './Header/Header'
import down from '../../../public/svg/Down.svg'
import s from './Cargo.module.scss'
import Group from './Group/Group'
import replace from '../../../public/svg/replace.svg'
import classNames from 'classnames'
import Footer from './Footer/Footer'

export const Cargo = () => {
  return (
    <>
      <Header />
      <div className={s.roll}>
        <img src={down.src} alt='down' />
      </div>
      <Group />
      <div className={s.replace}>
        <img src={replace.src} alt='replace' />
      </div>
      <Group />
      <div className={classNames(s.roll,s.roll_mod)}>
        <img src={down.src} alt='down' />
      </div>
      <Footer/>
    </>
  )
}
