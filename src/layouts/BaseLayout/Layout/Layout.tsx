import React, { PropsWithChildren } from 'react'
import s from './Layout.module.scss'

export const Layout:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={s.cont}>
        {children}
    </div>
  )
}