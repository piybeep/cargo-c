import '@/styles/globals.scss'
import classNames from 'classnames'
import { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react';
import { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

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
