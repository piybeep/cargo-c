import React, { useState } from 'react'
import Param from './Param/Param'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import { useForm } from 'react-hook-form'
import { createCargo } from './Body/type'

export const NewCargo = () => {
  const { handleSubmit, control,watch } = useForm<createCargo>({
    defaultValues: {
      type: 'Ящик',
      tiers: 'Да - оптимально',
      turn: true,
      tilting: true
    }
  })
  const [unitLength, setUnitLength] = useState('мм')
  const [unitWeight, setUnitWeight] = useState('кг')

  const Submit = (data: createCargo) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(Submit)}>
      <Param />
      <Body
        control={control}
        unitLength={unitLength}
        setUnitLength={setUnitLength}
        unitWeight={unitWeight}
        setUnitWeight={setUnitWeight}
        watch={watch}
      />
      <Footer />
    </form>
  )
}
