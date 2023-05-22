import React, { useState } from 'react'
import Param from './Param/Param'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import { useForm } from 'react-hook-form'
import { createCargo } from './Body/type'
import { useCreateCargo } from './hook/useCreateCargo'

export const NewCargo = ({ groupId }: { groupId: string }) => {
  const { mutateAsync, isLoading } = useCreateCargo()
  const [color, setColor] = useState('#aabbcc')
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { dirtyFields, defaultValues }
  } = useForm<createCargo>({
    defaultValues: {
      type: 'Ящик',
      tiers: 'Да - оптимально',
      turn: true,
      tilting: true
    }
  })
  const [sizeUnit, setUnitLength] = useState<'мм' | 'м' | 'см'>('мм')
  const [weightUnit, setUnitWeight] = useState<'кг' | 'тн'>('кг')

  const Submit = async (data: createCargo) => {
    await mutateAsync({
      ...data,
      weightUnit,
      sizeUnit,
      color,
      isTemplate: false,
      groupId
    })
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(Submit)}>
      <Param
        reset={reset}
        dirtyFields={dirtyFields}
        defaultValues={defaultValues}
        color={color}
        setColor={setColor}
      />
      <Body
        control={control}
        sizeUnit={sizeUnit}
        setUnitLength={setUnitLength}
        weightUnit={weightUnit}
        setUnitWeight={setUnitWeight}
        watch={watch}
      />
      <Footer isLoading={isLoading} />
    </form>
  )
}
