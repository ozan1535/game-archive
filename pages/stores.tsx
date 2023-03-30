import { InvalidPage } from "@/components/InvalidPage/InvalidPage";
import { Pagination } from "@/components/Pagination/Pagination";
import { SecondaryCard } from "@/components/SecondaryCard/SecondaryCard";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { useGetCurrentData } from "@/layouts/LayoutCardPages/hooks/useGetCurrentData";
import { IData } from "@/layouts/LayoutCardPages/types";
import { getSession } from "next-auth/react";

export default function Stores({ count }: IData) {
  const data = useGetCurrentData("stores");

  if (data?.detail) {
    return <InvalidPage detail={data.detail} />;
  }

  return (
    <>
      <SecondaryCard data={data} page="stores" />
      {count > 20 && (
        <div className={"layoutCardPages__Pagination"}>
          <Pagination count={count} />
        </div>
      )}
    </>
  );
}

Stores.getLayout = getLayoutCardPages;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const res = await fetch(
    `https://api.rawg.io/api/stores?key=${process.env.API_KEY}&page_size=20`
  );
  const data = await res.json();

  return {
    props: {
      session,
      data: data.results || data,
      count: data.count || 0,
    },
  };
}
