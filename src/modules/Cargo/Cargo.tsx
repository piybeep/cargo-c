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
import Image from 'next/image'

export const Cargo = () => {
  const [cards, setCards] = useState([
    { id: 0, name: 'Card 0' },
    { id: 1, name: 'Card 1' },
    { id: 2, name: 'Card 2' },
    { id: 3, name: 'Card 3' }
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
        <Image
          src={down.src}
          alt='Вниз'
          onClick={scrollDown}
          width={22}
          height={22}
        />
      </div>
      {cards.map((el, ind) => (
        <React.Fragment key={el.id}>
          <Group group={el} />
          {cards[ind + 1] ? (
            <motion.div className={s.replace}>
              <Image
                src={replace.src}
                alt='Поменять'
                onClick={() => handleSwap(ind)}
                width={20}
                height={20}
              />
            </motion.div>
          ) : (
            ''
          )}
        </React.Fragment>
      ))}
      <div className={classNames(s.roll, s.roll_mod)}>
        <Image
          width={22}
          height={22}
          src={down.src}
          alt='Вверх'
          onClick={scrollTop}
        />
      </div>
      <Footer />
    </>
  )
}
