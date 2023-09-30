import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { InvalidPage } from "@/components/InvalidPage/InvalidPage";
import { PageHead } from "@/components/PageHead/PageHead";
import { Pagination } from "@/components/Pagination/Pagination";
import { SecondaryCard } from "@/components/SecondaryCard/SecondaryCard";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { useGetCurrentData } from "@/layouts/LayoutCardPages/hooks/useGetCurrentData";
import { ICount } from "@/layouts/LayoutDefault/types";

export default function Genres({ count }: ICount) {
  const data = useGetCurrentData("genres");

  if (data?.detail) {
    return <InvalidPage detail={data.detail} />;
  }

  return (
    <>
      <PageHead
        title={"Game Archive - Genres"}
        description={
          "Game archive genres page. See all game genres on this page."
        }
        keywords={"game archive, game, genres"}
      />
      <SecondaryCard data={data} page="genres" />
      {count > 20 && (
        <div className={"layoutCardPages__Pagination"}>
          <Pagination count={count} />
        </div>
      )}
    </>
  );
}

Genres.getLayout = getLayoutCardPages;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const res = await fetch(
    `https://api.rawg.io/api/genres?key=${process.env.API_KEY}&page_size=20`
  );
  const data = await res.json();

  return {
    props: {
      session,
      data: data.results || data,
      count: data.count || 0,
    },
  };
};
