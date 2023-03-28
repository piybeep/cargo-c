import { HeaderProps } from './Header.types';

import { Logo } from '../../component/Logo';

import { Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons'
import { Typography } from 'antd';

import s from './Header.module.scss'

export function Header({ ...props }: HeaderProps) {
    const { Link, Text } = Typography
    return (
        <header className={s.wrapper}>
            <div className={s.menu}>
                <div className={s.info}>
                        <div className={s.logo}>
                            <Logo size='default'/>
                            <Link style={{cursor:'default'}}>
                                Название компании
                            </Link>
                        </div>
                        <Text>Текущий проект: Тестовый проект №1</Text>
                </div>

                <Button type="link">
                    Выйти
                    <ExportOutlined />
                </Button>
            </div>
        </header>
    );
};