import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useForm, Controller } from 'react-hook-form'

import { useSwipe } from '@/hook/useSwipe'

import { Typography, Input, Radio, Select, Button, Modal, Space } from 'antd'
import {
  SearchOutlined,
  CheckOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import Icon from '@ant-design/icons/lib/components/Icon'

import svgAdd from '../../../public/svg/IconAdd'

import s from './ProjectsList.module.scss'
import classNames from 'classnames'
import { useGetAllProjects } from './hook/useGetAllProjects'
import { useProjectStore, useUserStore } from '@/store'
import { useCreateProject } from './hook/useCreateProject'
import { format, parseISO } from 'date-fns'
import { useUpdateProjcet } from './hook/useUpdateProjcet'
import Menu from './Menu'
import { useRemoveProject } from './hook/useRemoveProject'
import { projectEntity } from '@/api/projects/type'
import { SkeletonProjects } from '../SkeletonProjects'

export function ProjectsList() {
  const router = useRouter()
  const { Title, Text } = Typography
  const { Search } = Input

  const [searchText, setSearchText] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState('ASC')
  const [sortField, setSortField] = useState('createdAt')

  const setSelectProject = useProjectStore((state) => state.setSelectProject)

  const userId = useUserStore((state) => state.id)

  const { data: projects, isLoading } = useGetAllProjects({
    userId: userId ? userId : '',
    searchString: searchText,
    sortDirection,
    sortField
  })
  const { mutateAsync, isLoading: isLoadingCreate } = useCreateProject()
  const {
    mutateAsync: updateProject,
    isLoading: isLoadingUpdate
  } = useUpdateProjcet()
  const {
    mutateAsync: deleteProject,
    isLoading: isLoadingRemove
  } = useRemoveProject()

  // useSwipe
  const [windowInnerWidth, setWindowInnerWidth] = useState(false)
  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    setSaveCurrentIndex,
    handleClick
  } = useSwipe(s.item)
  // useSwipe

  const options = [
    { label: 'По дате добавления', value: 'createdAt' },
    { label: 'По дате изменения', value: 'updatedAt' },
    { label: 'По названию', value: 'name' }
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddModalOpen, setAddIsModalOpen] = useState(false)

  // для контроля размеров
  const [windowWidth, setWindowWidth] = useState('default')

  useEffect(() => {
    if (window) {
      window.innerWidth > 660
        ? setWindowWidth('default')
        : setWindowWidth('small')
      window.innerWidth > 660
        ? setWindowInnerWidth(false)
        : setWindowInnerWidth(true)
    }
  }, [])

  const { control, handleSubmit, setValue } = useForm<{ name: string }>()

  // Открывает конкретный проект
  const open = (id: string, e: any) => {
    e.stopPropagation()
    window.localStorage.setItem('lastSelectedProject', id)
    router.replace(`/cargo?projectId=${id}`, undefined, { shallow: true })
  }

  const copyProject = async ({ name }: { name: string }) => {
    if (userId) {
      const newProject = await mutateAsync({ name, userId })
      router.push({
        pathname: '/',
        query: {
          projectId: newProject.id
        }
      })
    }
  }

  const close = () => {
    setIsModalOpen(false)
    setAddIsModalOpen(false)
    setValue('name', '')
  }

  const onSubmit = async ({ name }: { name: string }) => {
    const id = router.query.projectId
    if (typeof id === 'string' && userId) {
      const newProject = await updateProject({ name, id, userId })
      setSelectProject(newProject)
    }
    close()
  }

  const addProject = async (data: { name: string }) => {
    if (data.name && userId) {
      const newProject = await mutateAsync({ name: data.name, userId })
      setSelectProject(newProject)
      window.localStorage.setItem('lastSelectedProject', newProject.id)
      router.push({
        pathname: '/',
        query: {
          projectId: newProject.id
        }
      })
      close()
    }
  }

  const removeProject = ({ id }: { id: string }) => {
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить этот проект?',
      icon: <ExclamationCircleOutlined />,
      onCancel: () => close(),
      onOk: async () => {
        await deleteProject({ id })
        const firstProject = projects?.pages.at(0)?.data.at(0)
        if (firstProject) {
          setSaveCurrentIndex(firstProject.id)
          setSelectProject(firstProject)
          window.localStorage.setItem('lastSelectedProject', firstProject.id)
          router.push({
            pathname: '/',
            query: {
              projectId: firstProject.id
            }
          })
        }
        close()
      },
      maskClosable: true,
      okText: 'Да',
      cancelText: 'Отмена',
      okButtonProps: {
        loading: isLoadingRemove
      }
    })
  }

  useEffect(() => {
    const lastSelectedProject = localStorage.getItem('lastSelectedProject')
    const firstProject = projects?.pages.at(0)?.data.at(0)?.id
    if (window && firstProject) {
      window.localStorage.setItem('lastSelectedProject', firstProject)
      router.push({
        pathname: '/',
        query: {
          projectId: firstProject
        }
      })
    } else if (window && lastSelectedProject) {
      router.push({
        pathname: '/',
        query: {
          projectId: lastSelectedProject
        }
      })
    }
  }, [])

  const handleClickProject = (current: projectEntity) => {
    handleClick()
    window.localStorage.setItem('lastSelectedProject', current.id)
    setSelectProject(current)
    router.push({
      pathname: '/',
      query: { projectId: current.id }
    })
  }

  const getDatePretty = (from: string, to: string) => {
    return (
      'Добавлено ' +
      format(parseISO(from), 'dd.MM.y') +
      ', обновленно ' +
      format(parseISO(to), 'dd.MM.y')
    )
  }

  return (
    <div className={s.wrapper}>
      <Modal
        title='Переименовать'
        open={isModalOpen}
        footer={null}
        className={s.modal}
        mask={true}
        onCancel={close}
      >
        <form className={s.input} onSubmit={handleSubmit(onSubmit)}>
          <Space.Compact style={{ width: '100%' }}>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder='Введите название' />
              )}
            />
            <Button
              htmlType='submit'
              type='primary'
              loading={isLoadingUpdate}
              icon={<CheckOutlined />}
            ></Button>
          </Space.Compact>
        </form>
      </Modal>

      <Modal
        title='Название'
        open={isAddModalOpen}
        footer={null}
        className={s.modal}
        mask={true}
        onCancel={close}
      >
        <form className={s.input} onSubmit={handleSubmit(addProject)}>
          <Space.Compact style={{ width: '100%' }}>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder='Новый проект' />
              )}
            />
            <Button
              htmlType='submit'
              type='primary'
              icon={<CheckOutlined />}
              loading={isLoadingCreate}
            ></Button>
          </Space.Compact>
        </form>
      </Modal>

      <div className={s.header}>
        <div className={s.header__search}>
          <Title level={5} className={s.header__title}>
            Список проектов
          </Title>
          <div className={s.header__input}>
            <Search
              key='search'
              id='search'
              placeholder='Поиск...'
              onSearch={(data) => setSearchText(data)}
              enterButton={[<SearchOutlined key={'searchIcon'} />, 'Найти']}
            />
          </div>
        </div>
        <div className={s.header__sort}>
          <Select
            defaultValue='По возрастанию'
            className={s.header__select}
            bordered={false}
            onChange={(data) => setSortDirection(data)}
            options={[
              {
                value: 'ASC',
                label: 'По возрастанию'
              },
              {
                value: 'DESC',
                label: 'По убыванию'
              }
            ]}
          />
          <Radio.Group
            options={options}
            onChange={(data) => setSortField(data.target.value)}
            defaultValue={'createdAt'}
            size={windowWidth as SizeType}
            buttonStyle={windowWidth === 'small' ? 'solid' : 'outline'}
            className={s.header__group}
            optionType='button'
          />
        </div>
      </div>

      <div className={s.list}>
        {!isLoading ? (
          projects?.pages.map((el) =>
            el.data.map((elem) => (
              <div className={s.list__wrapper} key={elem.id}>
                <div
                  className={classNames(s.item, {
                    [s.item_active]: router.query.projectId == elem.id
                  })}
                  onClick={() => handleClickProject(elem)}
                  onTouchStart={(e) =>
                    windowInnerWidth && handleTouchStart(e, elem.id)
                  }
                  onTouchMove={(e) =>
                    windowInnerWidth && handleTouchMove(e, elem.id)
                  }
                  onTouchEnd={() => windowInnerWidth && handleTouchEnd(elem.id)}
                  id={elem.id}
                >
                  <svg
                    className={s.item__svg}
                    width='34'
                    height='28'
                    viewBox='0 0 34 28'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      className={s.item__svg}
                      stroke='#1890FF'
                      d='M4.03709 0.666748H11.4445L17.0001 6.00008H29.963C30.9453 6.00008 31.8874 6.37468 32.5819 7.04148C33.2765 7.70828 33.6667 8.61265 33.6667 9.55564V23.7779C33.6667 24.7209 33.2765 25.6252 32.5819 26.292C31.8874 26.9588 30.9453 27.3334 29.963 27.3334H4.03709C3.05481 27.3334 2.11276 26.9588 1.41818 26.292C0.723598 25.6252 0.333387 24.7209 0.333387 23.7779V4.2223C0.333387 3.27931 0.723598 2.37494 1.41818 1.70815C2.11276 1.04135 3.05481 0.666748 4.03709 0.666748Z'
                      fill='#1890FF'
                    />
                  </svg>
                  <div className={s.item__info}>
                    <Title level={5}>{elem.name}</Title>
                    <Text className={s.item__text} type='secondary'>
                      {getDatePretty(elem.createdAt, elem.updatedAt)}
                    </Text>
                  </div>
                  <Button
                    className={s.item__open}
                    onClick={(e) => open(elem.id, e)}
                  >
                    Открыть
                  </Button>
                  <div className={s.item__buttons}>
                    <Menu
                      projectEl={elem}
                      remove={removeProject}
                      copy={copyProject}
                      edit={setIsModalOpen}
                    />
                  </div>
                </div>
                <div className={s.list__menu}>
                  <Menu
                    projectEl={elem}
                    remove={removeProject}
                    copy={copyProject}
                    edit={setIsModalOpen}
                  />
                </div>
              </div>
            ))
          )
        ) : (
          <SkeletonProjects />
        )}
      </div>

      <div className={s.add}>
        <Button
          type='primary'
          className={s.add__button}
          onClick={() => {
            setAddIsModalOpen(true)
          }}
        >
          <Icon component={svgAdd} />
          Добавить новый проект
        </Button>
      </div>
    </div>
  )
}
