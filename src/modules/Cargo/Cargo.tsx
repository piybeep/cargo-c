import React, { useState } from 'react'
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
import { motion } from 'framer-motion'

export const Cargo = () => {
  const [cards, setCards] = useState([
    { id: 0, name: 'Card 1' },
    { id: 1, name: 'Card 2' },
    { id: 2, name: 'Card 3' },
    { id: 3, name: 'Card 4' }
  ])

  const handleSwap = (index: number) => {
    setCards((prevCards) => {
      const newCards = [...prevCards]
      const temp = newCards[index]
      newCards[index] = newCards[index + 1]
      newCards[index + 1] = temp
      return newCards
    })
  }

  const scrollDown = () => {
    window.scrollBy({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  const scrollTop = () => {
    window.scrollBy({ top: -document.body.scrollHeight, behavior: 'smooth' })
  }

  return (
    <>
      <Header />
      <div className={s.roll}>
        <img src={down.src} alt='down' onClick={scrollDown} />
      </div>
      {cards.map((el, ind) => (
        <React.Fragment key={el.id}>
          <Group el={el} />
          {cards[ind + 1] ? (
            <motion.div className={s.replace}>
              <img
                src={replace.src}
                alt='replace'
                onClick={() => handleSwap(ind)}
              />
            </motion.div>
          ) : (
            ''
          )}
        </React.Fragment>
      ))}
      <div className={classNames(s.roll, s.roll_mod)}>
        <img src={down.src} alt='top' onClick={scrollTop} />
      </div>
      <Footer />
    </>
  )
}
