import React from 'react'
import Header from './Header/Header'
import down from '../../../public/svg/Down.svg'
import s from './Cargo.module.scss'

export const Cargo = () => {
  return (
    <>
      <Header />
      <div className={s.roll}>
        <img src={down.src} alt='down' />
      </div>
    </>
  )
}
