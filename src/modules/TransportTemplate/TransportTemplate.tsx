import Link from 'next/link'

import { Button, Modal, Pagination, Typography } from 'antd'
import Icon from '@ant-design/icons/lib/components/Icon'

import { TransportTemplateProps } from './TransportTemplate.types'

import { useSwipe } from '@/hook/useSwipe'
import { useEffect, useState } from 'react'

import s from './TransportTemplate.module.scss'
import { useGetTransportTemplate } from './hook/useGetTransportTemplate'
import { transportEntity } from '@/api/transport/type'
import { useRouter } from 'next/router'
import { useRemoveTransport } from '../Transport/hook/useRemoveTransport'
import { ExclamationCircleOutlined } from '@ant-design/icons'

export function TransportTemplate({ ...props }: TransportTemplateProps) {
  const { Title, Text } = Typography

  const rouer = useRouter()

  const [windowWidth, setWindowWidth] = useState(false)
  const [windowSwipe, setWindowSwipe] = useState(false)

  const { data, fetchNextPage } = useGetTransportTemplate()

  const { mutateAsync, isLoading: isLoadingRemove } = useRemoveTransport({
    template: true,
    page: data?.pageParams
  })

  const handleRemove = (id: string) => {
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить этот груз?',
      icon: <ExclamationCircleOutlined />,
      onCancel: () => close(),
      onOk: async () => {
        await mutateAsync({ id })
        await fetchNextPage({
          pageParam: data?.pageParams[data?.pageParams.length - 1]
            ? data?.pageParams[data?.pageParams.length - 1]
            : 0
        })
        setSaveCurrentIndex(undefined)
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
  console.log(data)

  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    setSaveCurrentIndex,
    handleClick
  } = useSwipe(s.item, -56)

  useEffect(() => {
    if (window) {
      window.innerWidth > 830 ? setWindowWidth(false) : setWindowWidth(true)
      window.innerWidth > 660 ? setWindowSwipe(false) : setWindowSwipe(true)
    }
  }, [])

  const currentPage = () => {
    if (
      data?.pageParams.at(data.pageParams.length - 1) !== undefined &&
      data.pages[data.pages.length - 1].data.length > 0
    ) {
      return data.pageParams.at(data.pageParams.length - 1) as number
    } else {
      return 0
    }
  }

  const Page = data?.pages
    ?.filter((el) => el.page == currentPage())
    .reverse()[0]?.data

  const changePage = async (page: number) => {
    await fetchNextPage({ pageParam: page - 1 })
  }

  const getInfo = (data: transportEntity) => {
    let volume = ''

    if (data.sizeUnit === 'м') {
      volume += data.width * data.height * data.length
    } else if (data.sizeUnit === 'см') {
      volume += (data.width * data.height * data.length) / 100
    } else {
      volume += (data.width * data.height * data.length) / 1000
    }

    return (
      data.type +
      ' ' +
      data.length +
      ' x ' +
      data.width +
      ' x ' +
      data.height +
      ' ' +
      data.sizeUnit +
      ', ' +
      data.weight +
      ' ' +
      data.weightUnit +
      ', ' +
      volume +
      ' м2'
    )
  }

  const Menu = ({ id }: { id: string }) => {
    return (
      <div className={s.menu}>
        <span title='Удалить' className={s.menu__svg}>
          <svg
            className={s.menu__svg}
            onClick={(e) => {
              e.stopPropagation()
              handleRemove(id)
            }}
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clipPath='url(#clip0_404_1322)'>
              <path
                d='M4 7H20'
                stroke='#1890FF'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M10 11V17'
                stroke='#1890FF'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M14 11V17'
                stroke='#1890FF'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7'
                stroke='#1890FF'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M8.99988 7V4C8.99988 3.73478 9.10523 3.48043 9.29277 3.29289C9.48031 3.10536 9.73466 3 9.99988 3H13.9999C14.2651 3 14.5194 3.10536 14.707 3.29289C14.8945 3.48043 14.9999 3.73478 14.9999 4V7'
                stroke='#1890FF'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </g>
          </svg>
        </span>
      </div>
    )
  }

  const editTransportTemplate = (id: string) => {
    handleClick()
    rouer.push(`/transport/config/${id}?template=true&edit=true`)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.list}>
        {Page?.map((current: transportEntity) => (
          <div key={current.id} className={s.list__wrapper}>
            <div
              className={s.item}
              onClick={() => editTransportTemplate(current.id)}
              onTouchStart={(e) =>
                windowSwipe && handleTouchStart(e, current.id)
              }
              onTouchMove={(e) =>
                windowSwipe && handleTouchMove(e, '' + current.id)
              }
              onTouchEnd={() => windowSwipe && handleTouchEnd('' + current.id)}
              id={'' + current.id}
            >
              <div className={s.item__wrapper}>
                {/* <Icon className={s.item__icon} component={getIcon(current.id)} /> */}
                <div className={s.item__info}>
                  <Title className={s.item__title} level={5}>
                    {current.name}
                  </Title>
                  <Text className={s.item__text} type='secondary'>
                    {getInfo(current)}
                  </Text>
                </div>
              </div>
              <div className={s.item__menu}>
                <span
                  title='Добавить транспорт из шаблона'
                  className={s.item__svg}
                  onClick={(e) => {
                    e.stopPropagation()
                    rouer.push(`/transport/config/${current.id}?template=true`)
                  }}
                >
                  <svg
                    className={s.item__svg}
                    width='28'
                    height='28'
                    viewBox='0 0 28 28'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g clipPath='url(#clip0_548_3443)'>
                      <path
                        d='M14 24.5C19.799 24.5 24.5 19.799 24.5 14C24.5 8.20101 19.799 3.5 14 3.5C8.20101 3.5 3.5 8.20101 3.5 14C3.5 19.799 8.20101 24.5 14 24.5Z'
                        stroke='#1890FF'
                        strokeWidth='1.75'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M12 18L17 14L12 10'
                        stroke='#1890FF'
                        strokeWidth='1.75'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </g>
                  </svg>
                </span>
                <div className={s.item__buttons}>
                  <Menu id={current.id} />
                </div>
              </div>
            </div>
            <div className={s.list__menu}>
              <Menu id={current.id} />
            </div>
          </div>
        ))}
      </div>
      <div className={s.footer}>
        <Link href='/transport'>
          <Button className={s.footer__back}>Отменить</Button>
        </Link>
        <Pagination
          className={s.footer__pagination}
          total={data?.pages[data.pages.length - 1]?.itemCount}
          showSizeChanger={false}
          showQuickJumper
          showTotal={(total) => `Total ${total} items`}
          current={currentPage() ? currentPage() + 1 : 1}
          onChange={changePage}
        />
      </div>
    </div>
  )
}
