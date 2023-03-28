import classNames from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Typography } from 'antd';
import Icon from '@ant-design/icons'

import { LINKS } from '@/constants/links';

import s from './Footer.module.scss'

export function Footer() {
    const { Text } = Typography
    const router = useRouter()
    return (
        <footer className={s.wrapper}>
            {LINKS.map(current => (
                <Link key={current.id} className={classNames(s.link, {[s.link__active]: current.link === router.pathname})} href={current.link}>
                    <div className={classNames(s.info, {[s.info__active]: current.link === router.pathname})}>
                        <Icon component={current.icon} className={s.info__icon} />
                        <Text className={s.info__text}>{current.text}</Text>
                    </div>
                </Link>
            ))}
        </footer>
    );
};