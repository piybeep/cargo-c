import { Typography } from 'antd'
import React from 'react'
import s from './Header.module.scss'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const { Title } = Typography
const { Search } = Input

const SearchButton = () => {
  return (
    <div className={s.search__button}>
      <SearchOutlined />
      <Title level={5}>Найти</Title>
    </div>
  )
}

const Header = () => {
  return (
    <div className={s.cont}>
      <Title level={5}>Список грузовых мест</Title>
      <Search
        placeholder='Поиск...'
        allowClear
        enterButton={<SearchButton />}
        size='large'
        onSearch={console.log}
        className={s.search}
      />
    </div>
  )
}

export default Header
