import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { InvalidPage } from "@/components/InvalidPage/InvalidPage";
import { PageHead } from "@/components/PageHead/PageHead";
import { Pagination } from "@/components/Pagination/Pagination";
import { SecondaryCard } from "@/components/SecondaryCard/SecondaryCard";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { useGetCurrentData } from "@/layouts/LayoutCardPages/hooks/useGetCurrentData";
import { ICount } from "@/layouts/LayoutDefault/types";

export default function Platforms({ count }: ICount) {
  const data = useGetCurrentData("platforms");

  if (data?.detail) {
    return <InvalidPage detail={data.detail} />;
  }

  return (
    <>
      <PageHead
        title={"Game Archive - Platforms"}
        description={
          "Game archive platforms page. See all game platforms on this page."
        }
        keywords={"game archive, game, platforms"}
      />
      <SecondaryCard data={data} page="platforms" />
      {count > 20 && (
        <div className={"layoutCardPages__Pagination"}>
          <Pagination count={count} />
        </div>
      )}
    </>
  );
}

Platforms.getLayout = getLayoutCardPages;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const res = await fetch(
    `https://api.rawg.io/api/platforms?key=${
      process.env.API_KEY
    }&page_size=20&page=${context.query.page || 1}`
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
