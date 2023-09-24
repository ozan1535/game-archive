import { getSession } from "next-auth/react";
import Head from "next/head";
import { Card } from "@/components/Card/Card";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { IData } from "@/layouts/LayoutCardPages/types";
import { Pagination } from "@/components/Pagination/Pagination";
import { useGetCurrentData } from "@/layouts/LayoutCardPages/hooks/useGetCurrentData";
import { InvalidPage } from "@/components/InvalidPage/InvalidPage";
import { PageHead } from "@/components/PageHead/PageHead";

export default function Home({ count }: IData) {
  const data = useGetCurrentData("games");

  if (data?.detail) {
    return <InvalidPage detail={data.detail} />;
  }

  return (
    <>
      <PageHead
        title={"Game Archive"}
        description={"Game archive home page. See all games on this page."}
        keywords={"game archive, game, all, games"}
      />

      <Card data={data} />
      {count > 20 && (
        <div className={"layoutCardPages__Pagination"}>
          <Pagination count={count} />
        </div>
      )}
    </>
  );
}

Home.getLayout = getLayoutCardPages;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // check page=44283 after deploy
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${
      process.env.API_KEY
    }&page_size=20&page=${context.query.page || 1}`
  );
  const data = await res.json();

  return {
    props: {
      session,
      data: data?.results || data,
      count: data.count || 0,
    },
  };
}
