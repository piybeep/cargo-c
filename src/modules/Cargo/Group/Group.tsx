import React, { useState } from 'react'
import s from './Group.module.scss'
import GroupEl from './GroupEl/GroupEl'
import Header from './Header/Header'
import Tool from './Tool/Tool'
import Footer from './Footer/Footer'
import { useDragEl } from './useDragEl'
import style from './GroupEl/GroupEl.module.scss'
import { useFieldArray, useForm } from 'react-hook-form'
import classNames from 'classnames'
import { motion } from 'framer-motion'

interface GroupProps {
  el: any
}

//ПЕРЕДЕЛАТЬ ТИП
export interface cargoCheckBox {
  cargo: { select?: boolean; name?: string }[]
}

const arr = [{ name: '1' }, { name: '2' }, { name: '3' }]

const Group: React.FC<GroupProps> = ({ el }) => {
  const [isHidden, setIsHidden] = useState(false)

  const { handleTouchEnd, handleTouchMove, handleTouchStart } = useDragEl(style)

  const { control, register, setValue, watch } = useForm<cargoCheckBox>({
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
          {fields.map((el, index) => (
            <GroupEl
              ind={index}
              key={index}
              el={el}
              handleTouchEnd={handleTouchEnd}
              handleTouchMove={handleTouchMove}
              handleTouchStart={handleTouchStart}
              register={register}
              control={control}
            />
          ))}
        </div>
        <Footer />
      </motion.div>
    </motion.div>
  )
}

export default Group
