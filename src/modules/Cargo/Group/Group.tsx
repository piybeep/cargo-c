import React, { useEffect, useState } from 'react'
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
import { Typography, Space, Checkbox } from 'antd'
import { CheckboxValueType } from 'antd/es/checkbox/Group'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

const { Title, Text } = Typography

const CheckboxGroup = Checkbox.Group

interface GroupProps {
  group: groupEntity
  indGroup: number
  editGroup: UseMutateAsyncFunction<any, unknown, editGroupProps, unknown>
}

interface customCargo extends cargoEntity {
  select?: boolean
}

export interface cargoCheckBox {
  cargo: customCargo[]
}

const Group: React.FC<GroupProps> = ({ group, indGroup, editGroup }) => {
  const [isHidden, setIsHidden] = useState(false)

  const { data, isLoading } = useGetAllCargo({
    templates: false,
    groupId: group.id
  })
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>()
  const [indeterminate, setIndeterminate] = useState(false)
  const [checkAll, setCheckAll] = useState(false)

  const onChange = (list: CheckboxValueType[]) => {
    if (data) {
      console.log(list)
      setCheckedList(list)
      setIndeterminate(!!list.length && list.length < data.length)
      setCheckAll(list.length === data.length)
    }
  }

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    if (data) {
      setCheckedList(e.target.checked ? data?.map((el, ind) => el.id) : [])
      setIndeterminate(false)
      setCheckAll(e.target.checked)
    }
  }

  const {
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    handleClick
  } = useSwipe(`cont__` + group.id)

  // const { control, setValue, watch, handleSubmit } = useForm<cargoCheckBox>()
  // const { fields, replace } = useFieldArray({
  //   control,
  //   name: 'cargo'
  // })

  // useEffect(() => {
  //   if (!isLoading && data) {
  //     replace(data?.map((el) => ({ ...el, select: false })))
  //   }
  // }, [isLoading])

  // const selectAll = (value: boolean) => {
  //   for (let i = 0; i < fields.length; i++) {
  //     setValue(`cargo.${i}.select`, value)
  //   }
  // }

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
          <Tool
            onCheckAllChange={onCheckAllChange}
            checkAll={checkAll}
            indeterminate={indeterminate}
          />
        ) : (
          <Space
            direction='vertical'
            align='center'
            style={{ width: '100%' }}
            size={0}
          >
            <Title level={5}>Добавьте груз...</Title>
            <Text type='secondary'>
              Выполните импорт из файла или укажите размеры вручную или добавьте
              из готовых шаблонов
            </Text>
          </Space>
        )}
        <div className={s.wrapper}>
          <CheckboxGroup
            className={s.wrapper__checkBox}
            options={data?.map((el, ind) => el.id)}
            value={checkedList}
            onChange={onChange}
          />
          <div className={s.wrapper__cargo}>
            {data?.map((el: any, index: any) => (
              <GroupEl
                ind={index}
                key={index}
                el={el}
                elId={group.name + el.name}
                handleTouchEnd={handleTouchEnd}
                handleTouchMove={handleTouchMove}
                handleTouchStart={handleTouchStart}
                handleClick={handleClick}
                // control={control}
                groupIndex={group.id}
              />
            ))}
          </div>
        </div>
        <Footer groupId={group.id} />
      </motion.div>
    </motion.div>
  )
}

export default Group
