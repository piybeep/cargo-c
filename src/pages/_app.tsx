import '@/styles/globals.scss'
import classNames from 'classnames'
import { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

export default function App({ Component, pageProps }: MyAppPropsType) {
  const queryClient = new QueryClient()
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <QueryClientProvider client={queryClient}>
    <div className={classNames('wrapper')}>
      {getLayout(<Component {...pageProps} />)}
    </div>
    </QueryClientProvider>
  )
}

export type GetLayoutFnType = {
  getLayout?: (page: React.ReactElement) => any
}

interface MyAppPropsType extends AppProps {
  Component: NextComponentType<NextPageContext, any, {}> & GetLayoutFnType
  pageProps: any
}
