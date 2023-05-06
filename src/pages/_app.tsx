import { AuthProvider } from '@/provider/AuthProvider'
import ReactQueryProvider from '@/provider/ReactQueryProvider'
import '@/styles/globals.scss'
import classNames from 'classnames'
import { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: MyAppPropsType) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <div className={classNames('wrapper')}>
          {getLayout(<Component {...pageProps} />)}
        </div>
      </AuthProvider>
    </ReactQueryProvider>
  )
}

export type GetLayoutFnType = {
  getLayout?: (page: React.ReactElement) => any
}

interface MyAppPropsType extends AppProps {
  Component: NextComponentType<NextPageContext, any, {}> & GetLayoutFnType
  pageProps: any
}
