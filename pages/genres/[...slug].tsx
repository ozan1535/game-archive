import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Card } from "@/components/Card/Card";
import { InvalidPage } from "@/components/InvalidPage/InvalidPage";
import { PageHead } from "@/components/PageHead/PageHead";
import { Pagination } from "@/components/Pagination/Pagination";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { useGetCurrentData } from "@/layouts/LayoutCardPages/hooks/useGetCurrentData";
import { ICountWithParam } from "@/layouts/LayoutDefault/types";

export default function Platform({ count, param }: ICountWithParam) {
  const data = useGetCurrentData("games", "genres", param);

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
        canAddSlug={true}
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

Platform.getLayout = getLayoutCardPages;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  // Fetch the data for the specified slug
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}&genres=${
      (context?.params?.slug as string)[0]
    }&page_size=20&page=${context.query.page || 1}`
  );
  const data = await res.json();

  return {
    props: {
      session,
      data: data.results || data,
      count: data.count || 0,
      param: (context?.params?.slug as string)[0],
    },
  };
};
