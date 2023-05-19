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

interface HeaderProps{
  searchString: string 
  setSearchString: React.Dispatch<React.SetStateAction<string>>
}

const Header:React.FC<HeaderProps> = ({searchString,setSearchString}) => {
  return (
    <div className={s.cont}>
      <Title level={5}>Список грузовых мест</Title>
      <Search
        placeholder='Поиск...'
        allowClear
        enterButton={<SearchButton />}
        size='large'
        onSearch={(data)=>setSearchString(data)}
        className={s.search}
      />
    </div>
  )
}

export default Header
