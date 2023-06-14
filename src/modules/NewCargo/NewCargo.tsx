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
import { useRemoveCargo } from '../Cargo/Group/hook/useRemoveCargo'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

export const NewCargo = ({
  groupId,
  cargo,
  projectId,
  template,
  edit
}: {
  groupId: string
  cargo?: cargoEntityById
  projectId: string
  template?: boolean
  edit?: boolean
}) => {
  const { mutateAsync: createCargo, isLoading } = useCreateCargo({
    groupId
  })
  const router = useRouter()
  const [color, setColor] = useState('#aabbcc')
  const { mutateAsync: editCargo, isLoading: isLoadingEdit } = useEditCargo({
    groupId,
    edit
  })
  const {
    mutateAsync: removeCargo,
    isLoading: isLoadingRemoveCargo
  } = useRemoveCargo({ groupId, template: template || edit ? true : false })

  const removeCargoModal = () => {
    if (cargo) {
      Modal.confirm({
        title: 'Вы уверены, что хотите удалить этот груз?',
        icon: <ExclamationCircleOutlined />,
        onCancel: () => close(),
        onOk: async () => {
          await removeCargo({ cargoId: cargo.id, groupId })
          router.push('/cargo')
        },
        maskClosable: true,
        okText: 'Да',
        cancelText: 'Отмена',
        okButtonProps: {
          loading: isLoadingRemoveCargo
        }
      })
    }
  }

  const saveTemplate = async () => {
    if (cargo) {
      const {
        length,
        width,
        weight,
        height,
        load,
        id,
        createdAt,
        updatedAt,
        group,
        ...newData
      } = cargo
      await createCargo({
        ...newData,
        height: Number(height),
        length: Number(length),
        width: Number(width),
        weight: Number(weight),
        load: Number(load),
        isTemplate: true
      })
    }
  }

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
        createdAt,
        updatedAt,
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
    console.log(data)
    if (cargo) {
      const { length, height, weight, width, load, ...newData } = data
      if (template && !edit) {
        await createCargo({
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
          groupId
        })
      } else {
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
          isTemplate: edit ? true : false,
          groupId,
          id: cargo.id
        })
      }
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
        existCargo={cargo ? true : false}
        saveTemplate={saveTemplate}
        isLoading={isLoading}
        removeCargoModal={removeCargoModal}
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
