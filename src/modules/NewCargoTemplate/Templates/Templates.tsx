import React from 'react'
import s from './Templates.module.scss'
import TemplateEl from './TemplateEl/TemplateEl'
import style from './TemplateEl/TemplateEl.module.scss'
import { useSwipe } from '@/hook/useSwipe'
import { useGetAllCargo } from '@/modules/Cargo/Group/hook/useGetAllCargo'

const arr = [
  { name: 'card1' },
  { name: 'card2' },
  { name: 'card3' },
  { name: 'card4' }
]

const Templates = ({ groupId }: { groupId: string }) => {
  const { handleTouchEnd, handleTouchMove, handleTouchStart } = useSwipe(
    style.cont
  )

  const { data } = useGetAllCargo({ groupId, templates: true })

  return (
    <div className={s.cont}>
      {arr.map((el, ind) => (
        <TemplateEl
          handleTouchEnd={handleTouchEnd}
          handleTouchMove={handleTouchMove}
          handleTouchStart={handleTouchStart}
          ind={ind}
          key={ind}
          el={el}
        />
      ))}
    </div>
  )
}

export default Templates
