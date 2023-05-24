import React, { useState } from 'react'
import s from './Header.module.scss'
import { Space, Typography } from 'antd'
import editSvg from '../../../../../public/svg/edit.svg'
import {
  EyeInvisibleOutlined,
  MinusOutlined,
  CloseOutlined,
  EyeOutlined
} from '@ant-design/icons'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { editGroupProps, groupEntity } from '@/api/groups/type'
import { UseMutateAsyncFunction } from 'react-query'
import { useRouter } from 'next/router'
import { queryClient } from '@/provider/ReactQueryProvider'

const { Paragraph, Text } = Typography

interface HeaderProps {
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
  group: groupEntity
  indGroup: number
  editGroup: UseMutateAsyncFunction<any, unknown, editGroupProps, unknown>
}

const Header: React.FC<HeaderProps> = ({
  setIsHidden,
  group,
  indGroup,
  editGroup
}) => {
  const router = useRouter()

  const changeName = async (name: string) => {
    if (typeof router.query.projectId === 'string') {
      await editGroup({
        groupId: group.id,
        projectId: router.query.projectId,
        data: { name }
      })
      queryClient.invalidateQueries('getGroups')
    }
  }

  const changeHiddenGroup = async () => {
    if (typeof router.query.projectId === 'string') {
      await editGroup({
        groupId: group.id,
        projectId: router.query.projectId,
        data: { hide: !group.hide }
      })
      queryClient.invalidateQueries('getGroups')
    }
  }

  return (
    <motion.div className={s.cont} layout='position'>
      <div className={s.info}>
        <div className={classNames(s.group, { [s.group__hidden]: group.hide })}>
          <Text>
            {group.hide
              ? 'Грузовая группа отключена'
              : `Грузовая группа #${indGroup}`}
          </Text>
        </div>
        <Paragraph
          editable={{
            icon: (
              <Image alt='Изменить' height={16} width={16} src={editSvg.src} />
            ),
            onChange: changeName,
            triggerType: ['text', 'icon'],
            text: group.name
          }}
          className={s.fix}
        >
          {group.name}
        </Paragraph>
      </div>
      <Space size={'middle'} className={s.ico}>
        <MinusOutlined onClick={() => setIsHidden((e) => !e)} />
        {group.hide ? (
          <EyeOutlined onClick={changeHiddenGroup} />
        ) : (
          <EyeInvisibleOutlined onClick={changeHiddenGroup} />
        )}
        <CloseOutlined />
      </Space>
    </motion.div>
  )
}

export default Header
