import React, { useState } from 'react'
import s from './Group.module.scss'
import GroupEl from './GroupEl/GroupEl'
import Header from './Header/Header'
import Tool from './Tool/Tool'
import Footer from './Footer/Footer'
import { useFieldArray, useForm } from 'react-hook-form'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useSwipe } from '@/hook/useSwipe'
import { editGroupProps, groupEntity } from '@/api/groups/type'
import { UseMutateAsyncFunction } from 'react-query'
import { useGetAllCargo } from './hook/useGetAllCargo'
import { cargoEntity } from '@/api/cargo/type'
import { Typography,Space  } from 'antd';

const { Title,Text } = Typography;

interface GroupProps {
  group: groupEntity
  indGroup: number
  editGroup: UseMutateAsyncFunction<any, unknown, editGroupProps, unknown>
}

//ПЕРЕДЕЛАТЬ ТИП
export interface cargoCheckBox {
  cargo: cargoEntity & { select?: boolean }[]
}

const Group: React.FC<GroupProps> = ({ group, indGroup, editGroup }) => {
  const [isHidden, setIsHidden] = useState(false)

  const { data, isLoading } = useGetAllCargo({
    templates: false,
    groupId: group.id
  })

  const {
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    handleClick
  } = useSwipe(`cont__` + group.id)

  const { control, setValue, watch } = useForm<cargoCheckBox>({
    defaultValues: { cargo: data?.map((el) => ({ ...el, select: false })) }
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
  console.log(data?.length)

  if (isLoading) return <></>
  return (
    <motion.div className={s.cont} layout>
      <Header
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        group={group}
        indGroup={indGroup}
        editGroup={editGroup}
      />
      <motion.div
        className={classNames(s.hidden, { [s.hidden_mod]: isHidden })}
      >
        {data?.length !== 0 ? (
          <Tool selectAll={selectAll} watch={watch} />
        ) : (
          <Space direction='vertical' align='center' style={{width:'100%'}} size={0}>
            <Title level={5}>Добавьте груз...</Title>
            <Text type='secondary'>
              Выполните импорт из файла или укажите размеры вручную или добавьте
              из готовых шаблонов
            </Text>
          </Space>
        )}
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
              handleClick={handleClick}
              control={control}
              groupIndex={group.id}
            />
          ))}
        </div>
        <Footer groupId={group.id} />
      </motion.div>
    </motion.div>
  )
}

export default Group
