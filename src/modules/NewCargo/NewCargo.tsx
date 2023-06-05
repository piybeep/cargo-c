import React, { useEffect, useState } from 'react'
import Param from './Param/Param'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import { useForm } from 'react-hook-form'
import { createCargo } from './Body/type'
import { useCreateCargo } from './hook/useCreateCargo'
import { useEditCargo } from './hook/useEditCargo'
import { cargoEntityById } from '@/api/cargo/type'
import { useRouter } from 'next/router'

export const NewCargo = ({
  groupId,
  cargo,
  projectId
}: {
  groupId: string
  cargo?: cargoEntityById
  projectId: string
}) => {
  const { mutateAsync: createCargo, isLoading } = useCreateCargo({ groupId })
  const router = useRouter()
  const [color, setColor] = useState('#aabbcc')
  const { mutateAsync: editCargo, isLoading: isLoadingEdit } = useEditCargo({
    groupId
  })
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

  useEffect(() => {
    if (cargo) {
      const {
        color,
        groupId,
        id,
        group,
        isTemplate,
        sizeUnit,
        weightUnit,
        ...newData
      } = cargo
      setUnitLength(sizeUnit)
      setUnitWeight(weightUnit)
      setColor(color)
      reset(newData)
    }
  }, [])

  const [sizeUnit, setUnitLength] = useState<'мм' | 'м' | 'см'>('мм')
  const [weightUnit, setUnitWeight] = useState<'кг' | 'тн'>('кг')

  const Submit = async (data: createCargo) => {
    if (cargo) {
      const { length, height, weight, width, load, ...newData } = data
      await editCargo({
        ...newData,
        length: Number(length),
        height: Number(height),
        weight: Number(weight),
        width: Number(width),
        load: Number(load),
        weightUnit,
        sizeUnit,
        color,
        isTemplate: false,
        groupId,
        id: cargo.id
      })
      router.push(`/cargo?projectId=${projectId}`)
    } else {
      await createCargo({
        ...data,
        weightUnit,
        sizeUnit,
        color,
        isTemplate: false,
        groupId
      })
      router.push(`/cargo?projectId=${projectId}`)
    }
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
      <Footer isLoading={isLoading} isLoadingEdit={isLoadingEdit} />
    </form>
  )
}
