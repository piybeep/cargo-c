import React from 'react'
import s from './Group.module.scss'
import GroupEl from './GroupEl/GroupEl'
import Header from './Header/Header'
import Tool from './Tool/Tool'
import Footer from './Footer/Footer'
import { useCardAnimation } from './useCardAnimation'
import { animated } from 'react-spring'
import { useDragEl } from './useDragEl'

interface GroupProps {
  isSwapped: { id: number | null }
  ind: number
  el: any
  arrRef: any
}

const arr = [1, 2, 3]

const Group: React.FC<GroupProps> = ({ arrRef, el, ind, isSwapped }) => {
  let CardAnimation = useCardAnimation({
    isSwapped,
    ind,
    ref: arrRef
  })

  const { handleTouchEnd, handleTouchMove, handleTouchStart } = useDragEl()

  return (
    <animated.div
      className={s.cont}
      ref={el}
      style={isSwapped.id ? CardAnimation : {}}
    >
      <Header />
      <Tool />
      <div className={s.wrapper}>
        {arr.map((el, ind) => (
          <GroupEl
            ind={ind}
            key={ind}
            handleTouchEnd={handleTouchEnd}
            handleTouchMove={handleTouchMove}
            handleTouchStart={handleTouchStart}
          />
        ))}
      </div>
      <Footer />
    </animated.div>
  )
}

export default Group
