import Head from "next/head";
import { useRouter } from "next/router";
import { IPageHead } from "@/layouts/LayoutDefault/types";

export function PageHead({
  title,
  description,
  keywords,
  canAddSlug = false,
}: IPageHead) {
  const router = useRouter();
  return (
    <Head>
      <title>{`${title} ${
        canAddSlug
          ? " - " +
            router.asPath
              .split("/")
              .slice(-1)[0]
              .replace(/^./, (str) => str.toUpperCase())
          : ""
      }`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/game-icon.png" />
    </Head>
  );
}
