import { useTransport } from '@/store';
// import { useState } from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Button, Typography } from 'antd';

import { TransportProps } from './Transport.types';

import Icon from '@ant-design/icons/lib/components/Icon';

import s from './Transport.module.scss'

import { useSwipe } from '../../hook/useSwipe'

import IconAdd from '@/public/svg/IconAdd';
import IconShablon from '@/public/svg/IconShablon';

export function Transport({ ...props }: TransportProps) {
    const { Title, Text } = Typography

    const [windowWidth, setWindowWidth] = useState(false)

    const router = useRouter()

    useEffect(() => {
        if (window) {
            window.innerWidth > 660 ? setWindowWidth(false) : setWindowWidth(true)
        }
    }, [])
    // zustand 
    const {
        transport,
        setRemoveTransport,
        setSelectTransport,
        setRemoveSelectTransport,
        getIcon,
    } = useTransport(state => state)
    // zustand 

    // Swipe logic
    const { handleTouchStart, handleTouchMove, handleTouchEnd, setSaveCurrentIndex, handleClick } = useSwipe(s.item)
    // Swipe logic

    const handleRemoveTransport = (id: number) => {
        setRemoveTransport(id)
        setSaveCurrentIndex(undefined)
    }

    const handleClickItem = (id: number) => {
        setSelectTransport(id)
        handleClick()
        router.push('/transport/config')
    }

    const addNewTransport = () => {
        setRemoveSelectTransport()
        router.push('/transport/config')
    }

    const Menu = ({ id }: { id: number }) => {
        return (
            <div className={s.menu} onClick={(e) => e.stopPropagation()}>
                <span title='Добавить в шаблон' className={s.item__svg}>
                    <svg className={s.item__svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_404_1313)">
                            <path d="M6 4H16L20 8V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4Z" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 16C13.1046 16 14 15.1046 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 15.1046 10.8954 16 12 16Z" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14.001 4V8H8.00098V4" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    </svg>
                </span>
                <span title='Дублировать' className={s.item__svg}>
                    <svg className={s.item__svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_404_1318)">
                            <path d="M18.9999 3H8.99988C7.89531 3 6.99988 3.89543 6.99988 5V15C6.99988 16.1046 7.89531 17 8.99988 17H18.9999C20.1044 17 20.9999 16.1046 20.9999 15V5C20.9999 3.89543 20.1044 3 18.9999 3Z" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 17V19C17 19.5304 16.7893 20.0391 16.4142 20.4142C16.0391 20.7893 15.5304 21 15 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V9C3 8.46957 3.21071 7.96086 3.58579 7.58579C3.96086 7.21071 4.46957 7 5 7H7" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    </svg>
                </span>
                <span title='Удалить' className={s.item__svg}>
                    <svg className={s.item__svg} onClick={() => handleRemoveTransport(id)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_404_1322)">
                            <path d="M4 7H20" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 11V17" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 11V17" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.99988 7V4C8.99988 3.73478 9.10523 3.48043 9.29277 3.29289C9.48031 3.10536 9.73466 3 9.99988 3H13.9999C14.2651 3 14.5194 3.10536 14.707 3.29289C14.8945 3.48043 14.9999 3.73478 14.9999 4V7" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    </svg>
                </span>
            </div>
        )
    }

    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <Title level={5}>Список грузовых площадей</Title>
            </div>

            <div className={s.list}>
                {
                    transport.map((current, index) => {
                        return (
                            <div key={current.id} className={s.item__wrapper}>
                                <div className={s.item}
                                    onClick={() => handleClickItem(current.id)}
                                    onTouchStart={(e) => windowWidth && handleTouchStart(e, current.id)}
                                    onTouchMove={(e) => windowWidth && handleTouchMove(e, ''+current.id)}
                                    onTouchEnd={() => windowWidth && handleTouchEnd(''+current.id)}
                                    id={''+current.id}
                                >
                                    <Icon className={s.item__icon} component={getIcon(current.id)} />
                                    <div className={s.item__info}>
                                        <Title level={5}>{current.title}</Title>
                                        <Text>{current.text}</Text>
                                    </div>
                                    <div className={s.item__menu}>
                                        <Menu id={current.id} />
                                    </div>
                                </div>
                                <div className={s.list__menu}>
                                    <Menu id={current.id} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={s.buttons}>
                <Button onClick={() => addNewTransport()} className={s.buttons__button} type='primary'>
                    <Icon className={s.buttons__icon} component={IconAdd} />
                    Добавить транспорт вручную
                </Button>
                <Link href='/transport/template'>
                    <Button className={s.buttons__button} type='primary' style={{ backgroundColor: '#389E0D' }}>
                        <Icon className={s.buttons__icon} component={IconShablon} />
                        Добавить из шаблона
                    </Button>
                </Link>
            </div>
        </div>
    );
};