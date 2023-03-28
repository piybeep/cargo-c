import {Auth} from '@/modules/Auth/'
import React from 'react'
import { AppPage } from '../_app'

const AuthPage: AppPage = () => {
  return <Auth />
}

AuthPage.getLayout = (page: React.ReactElement) => {
  return <>{page}</>
}

export default AuthPage
