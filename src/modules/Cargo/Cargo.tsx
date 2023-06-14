import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
//component
import Header from './Header/Header'
import Group from './Group/Group'
import Footer from './Footer/Footer'
//img
import down from '../../../public/svg/Down.svg'
import replace from '../../../public/svg/replace.svg'
//style
import s from './Cargo.module.scss'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useGetGroups } from './hook/useGetGroups'
import { useRouter } from 'next/router'
import { useCreateGroup } from './hook/useCreateGroup'
import { useEditGroup } from './hook/useEditGroup'
import { queryClient } from '@/provider/ReactQueryProvider'
import { useRemoveGroup } from './hook/useRemoveGroup'

export const Cargo = () => {
  const router = useRouter()

  useEffect(() => {
    if (!router.query.projectId) {
      const projectId = localStorage.getItem('lastSelectedProject')
      if (projectId) {
        router.replace({
          query: {
            projectId
          }
        })
      } else {
        router.replace('/')
      }
    }
  }, [router.query])

  const [searchString, setSearchString] = useState<string>('')

  const handleSwap = async (
    index: number,
    groupId: string,
    secondGroupId: string
  ) => {
    const projectId = router.query.projectId
    if (!isLoadingEdit && typeof projectId === 'string') {
      await editGroup({
        groupId,
        projectId,
        data: {
          position: index + 1
        }
      })
      await editGroup({
        groupId: secondGroupId,
        projectId,
        data: {
          position: index
        }
      })
      queryClient.invalidateQueries('getGroups')
    }
  }

  const scrollDown = () => {
    window.scrollBy({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  const scrollTop = () => {
    window.scrollBy({ top: -document.body.scrollHeight, behavior: 'smooth' })
  }

  const { data } = useGetGroups({
    searchString,
    projectId:
      typeof router.query.projectId === 'string' ? router.query.projectId : null
  })

  const {
    mutateAsync: createGroupAsync,
    isLoading: isLoadingCreate
  } = useCreateGroup()

  const { mutateAsync, isLoading: isLoadingRemove } = useRemoveGroup({
    projectId:
      typeof router.query.projectId === 'string' ? router.query.projectId : null
  })

  const createGroup = async () => {
    if (typeof router.query.projectId === 'string') {
      await createGroupAsync({ projectId: router.query.projectId })
    }
  }

  const removeGroupHandle = async (groupId: string) => {
    const projectId = router.query.projectId
    if (projectId && typeof projectId === 'string') {
      await mutateAsync({ projectId, groupId })
    }
  }

  const { mutateAsync: editGroup, isLoading: isLoadingEdit } = useEditGroup()

  return (
    <>
      <Header searchString={searchString} setSearchString={setSearchString} />
      <div className={s.roll}>
        <Image
          src={down.src}
          alt='Вниз'
          onClick={scrollDown}
          width={22}
          height={22}
        />
      </div>
      {data?.map((el, ind) => (
        <React.Fragment key={el.id}>
          <Group
            group={el}
            indGroup={ind + 1}
            editGroup={editGroup}
            removeGroupHandle={removeGroupHandle}
            isLoadingRemove={isLoadingRemove}
          />
          {data[ind + 1] ? (
            <motion.div className={s.replace}>
              <Image
                src={replace.src}
                alt='Поменять'
                onClick={() => handleSwap(ind + 1, el.id, data[ind + 1].id)}
                width={20}
                height={20}
              />
            </motion.div>
          ) : (
            ''
          )}
        </React.Fragment>
      ))}
      <div className={classNames(s.roll, s.roll_mod)}>
        <Image
          width={22}
          height={22}
          src={down.src}
          alt='Вверх'
          onClick={scrollTop}
        />
      </div>
      <Footer createGroup={createGroup} isLoadingCreate={isLoadingCreate} />
    </>
  )
}
