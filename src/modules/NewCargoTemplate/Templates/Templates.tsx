import React from 'react'
import s from './Templates.module.scss'
import TemplateEl from './TemplateEl/TemplateEl'
import { useDragEl } from '@/modules/Cargo/Group/useDragEl'
import style from './TemplateEl/TemplateEl.module.scss'

const arr = [1, 2, 3]

const Templates = () => {
  const { handleTouchEnd, handleTouchMove, handleTouchStart } = useDragEl(style)

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
