import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Card } from "@/components/Card/Card";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { Pagination } from "@/components/Pagination/Pagination";
import { useGetCurrentData } from "@/layouts/LayoutCardPages/hooks/useGetCurrentData";
import { InvalidPage } from "@/components/InvalidPage/InvalidPage";
import { PageHead } from "@/components/PageHead/PageHead";
import { ICount } from "@/layouts/LayoutDefault/types";

export default function Home({ count }: ICount) {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
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
};
