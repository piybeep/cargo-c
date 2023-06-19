import React, { useEffect, useState } from 'react'
import s from './Group.module.scss'
import GroupEl from './GroupEl/GroupEl'
import Header from './Header/Header'
import Tool from './Tool/Tool'
import Footer from './Footer/Footer'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useSwipe } from '@/hook/useSwipe'
import { useGetAllCargo } from './hook/useGetAllCargo'
import { Typography, Space, Checkbox, Modal } from 'antd'
import { CheckboxValueType } from 'antd/es/checkbox/Group'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useRemoveCargo } from './hook/useRemoveCargo'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useCreateCargo } from '@/modules/NewCargo/hook/useCreateCargo'
import { cargoEntity } from '@/api/cargo/type'
import { GroupProps } from './type'

const { Title, Text } = Typography

const CheckboxGroup = Checkbox.Group

const Group: React.FC<GroupProps> = ({
  group,
  indGroup,
  editGroup,
  removeGroupHandle,
  isLoadingRemove
}) => {
  const [isHidden, setIsHidden] = useState(false)
  const [infoAboutGroup, setInfoAboutGroup] = useState('')
  const [windowWidth, setWindowWidth] = useState(false)

  useEffect(() => {
    if (window) {
      window.innerWidth > 660 ? setWindowWidth(false) : setWindowWidth(true)
    }
  }, [])

  const { data, isLoading } = useGetAllCargo({
    groupId: group.id
  })

  const {
    mutateAsync: removeCargo,
    isLoading: isLoadingRemoveCargo
  } = useRemoveCargo({ groupId: group.id, template: false })

  const {
    mutateAsync: dublicateCargo,
    isLoading: isLoadingDublicate
  } = useCreateCargo({ groupId: group.id })

  const saveTemplate = ({ id, ...props }: cargoEntity) => {
    dublicateCargo({ ...props, groupId: group.id, isTemplate: true })
  }

  const createCargo = async (data: cargoEntity) => {
    const { length, width, weight, height, load, id, ...newData } = data
    await dublicateCargo({
      ...newData,
      height: Number(height),
      length: Number(length),
      width: Number(width),
      weight: Number(weight),
      load: Number(load)
    })
  }

  useEffect(() => {
    if (!isLoading && data && data.length > 0) {
      let count = 0
      let weight = 0
      let volume = 0
      data?.forEach((el) => {
        count += el.count
        if (el.weightUnit === 'кг') {
          weight += el.count * el.weight
        } else {
          weight += el.count * el.weight * 1000
        }
        if (el.sizeUnit === 'м') {
          volume += el.count * (el.width * el.height * el.length)
        } else if (el.sizeUnit === 'см') {
          volume += (el.count * (el.width * el.height * el.length)) / 100
        } else {
          volume += (el.count * (el.width * el.height * el.length)) / 1000
        }
      })
      setInfoAboutGroup(
        count +
          ' шт, ' +
          weight.toFixed(2) +
          ' кг, ' +
          volume.toFixed(2) +
          ' м3'
      )
    }
  }, [isLoading])

  const removeCargoModal = ({ id }: { id: string }) => {
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить этот груз?',
      icon: <ExclamationCircleOutlined />,
      onCancel: () => close(),
      onOk: async () => {
        await removeCargo({ cargoId: id, groupId: group.id })
        close()
      },
      maskClosable: true,
      okText: 'Да',
      cancelText: 'Отмена',
      okButtonProps: {
        loading: isLoadingRemoveCargo
      }
    })
  }

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>()
  const [indeterminate, setIndeterminate] = useState(false)
  const [checkAll, setCheckAll] = useState(false)

  const saveTemplateArray = async () => {
    if (checkedList && data) {
      data?.forEach(async (el) => {
        const existEl = checkedList.find((elem) => elem == el.id)
        if (existEl) {
          const { id, ...newEl } = el
          await dublicateCargo({
            ...newEl,
            groupId: group.id,
            isTemplate: true
          })
        }
      })
    }
    setCheckAll(false)
    setIndeterminate(false)
    setCheckedList([])
  }

  const removeArray = () => {
    if (checkedList && data) {
      checkedList?.forEach(async (el) => {
        if (typeof el === 'string') {
          await removeCargo({ cargoId: el, groupId: group.id })
        }
      })
    }
    setCheckAll(false)
    setIndeterminate(false)
    setCheckedList([])
  }

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

  if (isLoading) return <></>
  return (
    <motion.div className={s.cont} layout>
      <Header
        setIsHidden={setIsHidden}
        group={group}
        indGroup={indGroup}
        editGroup={editGroup}
        removeGroupHandle={removeGroupHandle}
        isLoadingRemove={isLoadingRemove}
      />
      <motion.div
        className={classNames(s.hidden, { [s.hidden_mod]: isHidden })}
      >
        {data?.length !== 0 ? (
          <Tool
            onCheckAllChange={onCheckAllChange}
            checkAll={checkAll}
            infoAboutGroup={infoAboutGroup}
            indeterminate={indeterminate}
            saveTemplateArray={saveTemplateArray}
            removeArray={removeArray}
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
            options={data?.map((el) => el.id)}
            value={checkedList}
            onChange={onChange}
          />
          <div className={s.wrapper__cargo}>
            {data?.map((el: any, index: any) => (
              <GroupEl
                key={index}
                el={el}
                elId={group.name + el.name}
                handleTouchEnd={handleTouchEnd}
                handleTouchMove={handleTouchMove}
                handleTouchStart={handleTouchStart}
                handleClick={handleClick}
                groupIndex={group.id}
                projectId={group.projectId}
                removeCargo={removeCargoModal}
                createCargo={createCargo}
                saveTemplate={saveTemplate}
                isLoadingDublicate={isLoadingDublicate}
                windowWidth={windowWidth}
              />
            ))}
          </div>
        </div>
        <Footer groupId={group.id} projectId={group.projectId} />
      </motion.div>
    </motion.div>
  )
}

export default Group
