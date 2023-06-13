import Link from 'next/link';

import { Typography } from 'antd';

import { NotFoundProps } from './NotFound.types';
import s from './NotFound.module.scss'
import { ExclamationCircleOutlined } from '@ant-design/icons';

export function NotFound({ }: NotFoundProps) {
    const { Text, Title } = Typography;
    return (
        <div className={s.wrapper}>
            <div className={s.wrapper__info}>
                <div className={s.wrapper__message}>
                    <ExclamationCircleOutlined className={s.wrapper__icon} />
                    <Title className={s.wrapper__title} level={5}>Ошибка 404. Такой страницы нет...</Title>
                </div>
                <Link href='/'>
                    <Text underline>Перейти к проектам</Text>
                </Link>
            </div>
        </div>
    );
};