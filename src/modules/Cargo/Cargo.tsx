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
import { useDebounce } from '@/utils/useDebounce'

export const Cargo = () => {
  const [isSwapped, setIsSwapped] = useState<{ id: null | number }>({
    id: null
  })
  const [cards, setCards] = useState([
    { id: 0, name: 'Card 1' },
    { id: 1, name: 'Card 2' },
    { id: 2, name: 'Card 3' },
    { id: 3, name: 'Card 4' }
  ])

  const swap = (ind: number) => {
    setIsSwapped({ id: ind + 1 })
    setTimeout(() => {
      let newCards = [...cards]
      newCards[ind] = cards[ind + 1]
      newCards[ind + 1] = cards[ind]
      setIsSwapped({ id: null })
      setCards([...newCards])
    }, 600)
  }

  const meDebounce = useDebounce(swap, 800)

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
        <React.Fragment key={ind}>
          <Group isSwapped={isSwapped} ind={ind} el={el} arrRef={cards} />
          {cards[ind + 1] ? (
            <div className={s.replace}>
              <img
                src={replace.src}
                alt='replace'
                onClick={() => meDebounce(ind)}
              />
            </div>
          ) : (
            ''
          )}
        </React.Fragment>
      ))}
      <div className={classNames(s.roll, s.roll_mod)}>
        <img src={down.src} alt='top' onClick={scrollTop}/>
      </div>
      <Footer />
    </>
  )
}
