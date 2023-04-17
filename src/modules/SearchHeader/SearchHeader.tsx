import s from './SearchHeader.module.scss'

import { Typography, Input } from 'antd';
import { SearchOutlined } from "@ant-design/icons";

export function SearchHeader() {
    const { Title } = Typography;
    const { Search } = Input;

    const onSearch = (value: string) => {
        console.log(value)
    }

    return (
        <div className={s.wrapper}>
            <div className={s.menu}>
                <Title className={s.title} level={5}>Выбор шаблона</Title>
                <Search
                    className={s.search}
                    key="search"
                    id="search"
                    placeholder="Выбор шаблона..."
                    onSearch={onSearch}
                    enterButton={[
                        <SearchOutlined key={"searchIcon"} />,
                        "Найти",
                    ]}
                />
            </div>
        </div>
    );
};