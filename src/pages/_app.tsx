import '@/styles/globals.scss'
import classNames from 'classnames'
import { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: MyAppPropsType) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <div className={classNames('wrapper')}>
      {getLayout(<Component {...pageProps} />)}
    </div>
  )
}

export type GetLayoutFnType = {
  getLayout?: (page: React.ReactElement) => any
}

interface MyAppPropsType extends AppProps {
  Component: NextComponentType<NextPageContext, any, {}> & GetLayoutFnType
  pageProps: any
}
