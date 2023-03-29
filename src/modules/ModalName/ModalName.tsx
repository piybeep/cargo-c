import classNames from 'classnames';

import { Typography, Input } from 'antd';

import { ModalNameProps } from './ModalName.types';

import s from './ModalName.module.scss'

export function ModalName({ inputText = '', isOpen = false, setIsOpen, ...props }: ModalNameProps) {

    const { Search } = Input;

    const onSearch = () => {

    }

    const { Title } = Typography;

    return (
        <div onClick={() => setIsOpen(false)} className={classNames(s.wrapper, { [s.wrapper__active]: isOpen })}>
            <div className={s.info} onClick={e => e.stopPropagation()}>
                <div className={s.header}>
                    <Title level={5}>Название</Title>
                    <svg onClick={() => setIsOpen(false)} className={s.header__close} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.92472 7.99916L13.6122 2.41166C13.6908 2.31881 13.6247 2.17773 13.5033 2.17773H12.0783C11.9944 2.17773 11.914 2.21523 11.8587 2.27952L7.99258 6.88845L4.12651 2.27952C4.07294 2.21523 3.99258 2.17773 3.90687 2.17773H2.48187C2.36044 2.17773 2.29437 2.31881 2.37294 2.41166L7.06044 7.99916L2.37294 13.5867C2.35534 13.6074 2.34405 13.6327 2.3404 13.6596C2.33676 13.6865 2.34092 13.7139 2.35239 13.7386C2.36386 13.7632 2.38216 13.784 2.40511 13.7985C2.42806 13.8131 2.4547 13.8207 2.48187 13.8206H3.90687C3.9908 13.8206 4.07115 13.7831 4.12651 13.7188L7.99258 9.10988L11.8587 13.7188C11.9122 13.7831 11.9926 13.8206 12.0783 13.8206H13.5033C13.6247 13.8206 13.6908 13.6795 13.6122 13.5867L8.92472 7.99916Z" fill="black" fillOpacity="0.45" />
                    </svg>
                </div>
                <div className={s.input}>
                    <Search placeholder="input search text" onSearch={onSearch} enterButton />
                </div>
            </div>
        </div>
    );
};