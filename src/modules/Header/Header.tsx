import { HeaderProps } from './Header.types';

import { Logo } from '../../component/Logo';

import { Button } from 'antd';
import { Typography } from 'antd';

import { useProjects } from '@/store';

import s from './Header.module.scss'

export function Header({ ...props }: HeaderProps) {
    const selectProject = useProjects(state => state.selectProject)
    const { Link, Text } = Typography
    return (
        <header className={s.wrapper}>
            <div className={s.menu}>
                <div className={s.info}>
                    <div className={s.logo}>
                        <Logo size='default' />
                        <Link className={s.logo__link} style={{ cursor: 'default' }}>
                            Название компании
                        </Link>
                    </div>
                    <div className={s.logo__title}>
                        <Text className={s.logo__text}>Текущий проект: </Text>
                        <Link className={s.logo__text} href="/projects">{selectProject?.title}</Link>
                    </div>
                </div>

                <Button className={s.button} href='/login' type="link">
                    Выйти
                    <svg className={s.button__svg} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g className={s.button__svg} clipPath="url(#clip0_179_9159)">
                            <path className={s.button__svg} d="M9.33333 5.33341V4.00008C9.33333 3.64646 9.19286 3.30732 8.94281 3.05727C8.69276 2.80722 8.35362 2.66675 8 2.66675H3.33333C2.97971 2.66675 2.64057 2.80722 2.39052 3.05727C2.14048 3.30732 2 3.64646 2 4.00008V12.0001C2 12.3537 2.14048 12.6928 2.39052 12.9429C2.64057 13.1929 2.97971 13.3334 3.33333 13.3334H8C8.35362 13.3334 8.69276 13.1929 8.94281 12.9429C9.19286 12.6928 9.33333 12.3537 9.33333 12.0001V10.6667" stroke="#1890FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            <path className={s.button__svg} d="M4.66663 8H14M14 8L12 6M14 8L12 10" stroke="#1890FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    </svg>
                </Button>
            </div>
        </header>
    );
};