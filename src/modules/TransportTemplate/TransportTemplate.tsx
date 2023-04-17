import { useTransportTemplate } from "@/store";

import Link from "next/link";

import { Button, Pagination, Typography } from 'antd';
import Icon from "@ant-design/icons/lib/components/Icon";

import { TransportTemplateProps } from "./TransportTemplate.types";

import Car from "../../../public/svg/car";

import s from './TransportTemplate.module.scss'

export function TransportTemplate({ ...props }: TransportTemplateProps) {

    const { Title, Text } = Typography

    // zustand 
    const {
        transportTemplate,
        setRemoveTransportTemplate
    } = useTransportTemplate(state => state)
    // zustand 

    const handleRemove = (id:any) => {
        setRemoveTransportTemplate(id)
    }

    return (
        <div className={s.wrapper}>
            <div className={s.list}>
                {transportTemplate.map(current => (
                    <div key={current.id} className={s.item}>
                        <div className={s.item__wrapper}>
                        <Icon className={s.item__icon} component={current.icon} />
                        <div className={s.item__info}>
                            <Title className={s.item__title} level={5}>{current.title}</Title>
                            <Text className={s.item__text} type="secondary">{current.text}</Text>
                        </div>
                        </div>
                        <div className={s.item__menu}>
                            <svg className={s.item__svg} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_548_3443)">
                                    <path d="M14 24.5C19.799 24.5 24.5 19.799 24.5 14C24.5 8.20101 19.799 3.5 14 3.5C8.20101 3.5 3.5 8.20101 3.5 14C3.5 19.799 8.20101 24.5 14 24.5Z" stroke="#1890FF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 18L17 14L12 10" stroke="#1890FF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                            </svg>
                            <div className={s.item__buttons}>
                                <svg className={s.item__buttons_svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_548_4135)">
                                        <path d="M6 4H16L20 8V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4Z" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 16C13.1046 16 14 15.1046 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 15.1046 10.8954 16 12 16Z" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14.001 4V8H8.00098V4" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                </svg>

                                <svg className={s.item__buttons_svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_548_4140)">
                                        <path d="M18.9998 3H8.99976C7.89519 3 6.99976 3.89543 6.99976 5V15C6.99976 16.1046 7.89519 17 8.99976 17H18.9998C20.1043 17 20.9998 16.1046 20.9998 15V5C20.9998 3.89543 20.1043 3 18.9998 3Z" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17 17V19C17 19.5304 16.7893 20.0391 16.4142 20.4142C16.0391 20.7893 15.5304 21 15 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V9C3 8.46957 3.21071 7.96086 3.58579 7.58579C3.96086 7.21071 4.46957 7 5 7H7" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                </svg>

                                <svg onClick={() => handleRemove(current.id)} className={s.item__buttons_svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_548_4144)">
                                        <path d="M4 7H20" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10 11V17" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14 11V17" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                </svg>

                            </div>
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
                    total={300}
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total) => `Total ${total} items`}
                />
            </div>
        </div>
    );
};