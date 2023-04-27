import React, { useState } from 'react'
import s from './Group.module.scss'
import GroupEl from './GroupEl/GroupEl'
import Header from './Header/Header'
import Tool from './Tool/Tool'
import Footer from './Footer/Footer'
import style from './GroupEl/GroupEl.module.scss'
import { useFieldArray, useForm } from 'react-hook-form'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useSwipe } from '@/hook/useSwipe'

interface GroupProps {
  group: any
}

//ПЕРЕДЕЛАТЬ ТИП
export interface cargoCheckBox {
  cargo: { select?: boolean; name?: string }[]
}

const arr = [{ name: '1' }, { name: '2' }, { name: '3' }]

const Group: React.FC<GroupProps> = ({ group }) => {
  const [isHidden, setIsHidden] = useState(false)

  const { handleTouchEnd, handleTouchMove, handleTouchStart } = useSwipe(`cont__` + group.id)

  const { control, setValue, watch } = useForm<cargoCheckBox>({
    defaultValues: { cargo: arr.map((el) => ({ ...el, select: false })) }
  })
  const { fields } = useFieldArray({
    control,
    name: 'cargo'
  })

  const selectAll = (value: boolean) => {
    for (let i = 0; i < fields.length; i++) {
      setValue(`cargo.${i}.select`, value)
    }
  }

  return (
    <motion.div className={s.cont} layout>
      <Header isHidden={isHidden} setIsHidden={setIsHidden} />
      <motion.div
        className={classNames(s.hidden, { [s.hidden_mod]: isHidden })}
      >
        <Tool selectAll={selectAll} watch={watch} />
        <div className={s.wrapper}>
          {fields.map((el: any, index: any) => (
            <GroupEl
              ind={index}
              key={index}
              el={el}
              elId={group.name + el.name}
              handleTouchEnd={handleTouchEnd}
              handleTouchMove={handleTouchMove}
              handleTouchStart={handleTouchStart}
              control={control}
              groupIndex={group.id}
            />
          ))}
        </div>
        <Footer />
      </motion.div>
    </motion.div>
  )
}

export default Group
