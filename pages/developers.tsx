import { InvalidPage } from "@/components/InvalidPage/InvalidPage";
import { Pagination } from "@/components/Pagination/Pagination";
import { SecondaryCard } from "@/components/SecondaryCard/SecondaryCard";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { useGetCurrentData } from "@/layouts/LayoutCardPages/hooks/useGetCurrentData";
import { IData } from "@/layouts/LayoutCardPages/types";
import { getSession } from "next-auth/react";

export default function Developers({ count }: IData) {
  const data = useGetCurrentData("developers");

  if (data?.detail) {
    return <InvalidPage detail={data.detail} />;
  }

  return (
    <>
      <SecondaryCard data={data} page="developers" />
      {count > 20 && (
        <div className={"layoutCardPages__Pagination"}>
          <Pagination count={count} />
        </div>
      )}
    </>
  );
}

Developers.getLayout = getLayoutCardPages;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const res = await fetch(
    `https://api.rawg.io/api/developers?key=${
      process.env.API_KEY
    }&page_size=20&page=${context.query.page || 1}`
  );
  const data = await res.json();

  return {
    props: {
      data: data.results || data,
      count: data.count || 0,
      session,
    },
  };
}
