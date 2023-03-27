import '@/styles/globals.css'
import { NextComponentType, NextPage, NextPageContext } from 'next'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: MyAppPropsType) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <>
      {
        getLayout(<Component {...pageProps} />)
      }
    </>
  )
}

export type GetLayoutFnType = {
  getLayout: (page: React.ReactElement) => any
}

export type AppPage = NextPage & GetLayoutFnType

interface MyAppPropsType extends AppProps {
  Component: NextComponentType<NextPageContext, any, {}> & GetLayoutFnType
  pageProps: any
}

