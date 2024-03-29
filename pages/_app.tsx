import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ReactElement, ReactNode } from "react";
import { SWRConfig } from "swr";
import "@/styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { session } = pageProps;

  const router = useRouter();

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fallback: {
            [`/api/games/${router.query.page || 1}/`]: pageProps.data,
            [`/api/platforms/${router.query.page || 1}/`]: pageProps.data,
            [`/api/genres/${router.query.page || 1}/`]: pageProps.data,
            [`/api/stores/${router.query.page || 1}/`]: pageProps.data,
            [`/api/firebase?slug=${router.query.slug}`]: pageProps.dataComment,
            [`/api/firebase?slug=getAllUserComments&mail=${session?.user?.email}`]:
              pageProps.dataComment,
            [`/api/developers/${router.query.page || 1}/`]: pageProps.data,
            [`/api/games/${router.query.page || 1}/platforms/${
              pageProps.param
            }`]: pageProps.data,
            [`/api/games/${router.query.page || 1}/stores/${pageProps.param}`]:
              pageProps.data,
            [`/api/games/${router.query.page || 1}/genres/${pageProps.param}`]:
              pageProps.data,
            [`/api/games/${router.query.page || 1}/developers/${
              pageProps.param
            }`]: pageProps.data,
          },
          fetcher: (url) => fetch(url, { method: "GET" }).then((r) => r.json()),
        }}
      >
        {getLayout(<Component {...pageProps} />)}
      </SWRConfig>
    </SessionProvider>
  );
}
