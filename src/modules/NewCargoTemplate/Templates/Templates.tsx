import React from 'react'
import s from './Templates.module.scss'
import TemplateEl from './TemplateEl/TemplateEl'
import style from './TemplateEl/TemplateEl.module.scss'
import { useSwipe } from '@/hook/useSwipe'

const arr = [1, 2, 3]

const Templates = () => {
  const { handleTouchEnd, handleTouchMove, handleTouchStart } = useSwipe(style.cont)

  return (
    <div className={s.cont}>
      {arr.map((el, ind) => (
        <TemplateEl
          handleTouchEnd={handleTouchEnd}
          handleTouchMove={handleTouchMove}
          handleTouchStart={handleTouchStart}
          ind={ind}
          key={ind}
        />
      ))}
    </div>
  )
}

export default Templates
