import React, { Dispatch, SetStateAction } from 'react'
import s from './ProjectsList.module.scss'

interface MenuProps {
  projectEl: {
    id: string
    name: string
    userId: string
    updatedAt: string
    createdAt: string
  }
  edit: Dispatch<SetStateAction<boolean>>
  copy: ({ name }: { name: string }) => void
  remove: ({ id }: { id: string }) => void
}

const Menu = ({ projectEl, edit, copy, remove }: MenuProps) => {
  return (
    <div className={s.menu}>
      <span title='Редактировать'>
        <svg
          className={s.menu__svg}
          onClick={() => edit(true)}
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g className={s.menu__svg} clipPath='url(#clip0_179_10303)'>
            <path
              d='M3.99927 20.0001H7.99927L18.4993 9.50006C19.0297 8.96963 19.3277 8.2502 19.3277 7.50006C19.3277 6.74991 19.0297 6.03049 18.4993 5.50006C17.9688 4.96963 17.2494 4.67163 16.4993 4.67163C15.7491 4.67163 15.0297 4.96963 14.4993 5.50006L3.99927 16.0001V20.0001Z'
              stroke='#1890FF'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M13.4999 6.49988L17.4999 10.4999'
              stroke='#1890FF'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </g>
        </svg>
      </span>
      <span title='Дублировать'>
        <svg
          className={s.menu__svg}
          onClick={() => copy(projectEl)}
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g className={s.menu__svg} clipPath='url(#clip0_179_10307)'>
            <path
              d='M18.9999 2.99988H8.99988C7.89531 2.99988 6.99988 3.89531 6.99988 4.99988V14.9999C6.99988 16.1044 7.89531 16.9999 8.99988 16.9999H18.9999C20.1044 16.9999 20.9999 16.1044 20.9999 14.9999V4.99988C20.9999 3.89531 20.1044 2.99988 18.9999 2.99988Z'
              stroke='#1890FF'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M16.9998 17V19C16.9998 19.5304 16.789 20.0391 16.414 20.4142C16.0389 20.7893 15.5302 21 14.9998 21H4.99976C4.46932 21 3.96062 20.7893 3.58554 20.4142C3.21047 20.0391 2.99976 19.5304 2.99976 19V9C2.99976 8.46957 3.21047 7.96086 3.58554 7.58579C3.96062 7.21071 4.46932 7 4.99976 7H6.99976'
              stroke='#1890FF'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </g>
        </svg>
      </span>

      <span title='Удалить'>
        <svg
          className={s.menu__svg}
          onClick={() => remove(projectEl)}
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g className={s.menu__svg} clipPath='url(#clip0_179_10311)'>
            <path
              d='M3.99976 7H19.9998'
              stroke='#1890FF'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M9.99976 10.9999V16.9999'
              stroke='#1890FF'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M13.9998 10.9998V16.9998'
              stroke='#1890FF'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M4.99976 7L5.99976 19C5.99976 19.5304 6.21047 20.0391 6.58554 20.4142C6.96062 20.7893 7.46932 21 7.99976 21H15.9998C16.5302 21 17.0389 20.7893 17.414 20.4142C17.789 20.0391 17.9998 19.5304 17.9998 19L18.9998 7'
              stroke='#1890FF'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M8.99988 6.99988V3.99988C8.99988 3.73466 9.10523 3.48031 9.29277 3.29277C9.48031 3.10523 9.73466 2.99988 9.99988 2.99988H13.9999C14.2651 2.99988 14.5194 3.10523 14.707 3.29277C14.8945 3.48031 14.9999 3.73466 14.9999 3.99988V6.99988'
              stroke='#1890FF'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </g>
        </svg>
      </span>
    </div>
  )
}

export default Menu
