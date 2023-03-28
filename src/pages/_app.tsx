import type { AppProps } from "next/app";
import classNames from "classnames";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

import "../styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppProps) {

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div className={classNames("wrapper")}>
      {getLayout(<Component {...pageProps} />)}
    </div>
  )
}
