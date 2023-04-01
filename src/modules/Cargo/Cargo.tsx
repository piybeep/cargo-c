import React from 'react'
import classNames from 'classnames'
//component
import Header from './Header/Header'
import Group from './Group/Group'
import Footer from './Footer/Footer'
//img
import down from '../../../public/svg/Down.svg'
import replace from '../../../public/svg/replace.svg'
//style
import s from './Cargo.module.scss'

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
      <div className={classNames(s.roll, s.roll_mod)}>
        <img src={down.src} alt='down' />
      </div>
      <Footer />
    </>
  )
}
