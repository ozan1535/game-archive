import { Card } from "@/components/Card/Card";
import { InvalidPage } from "@/components/InvalidPage/InvalidPage";
import { Pagination } from "@/components/Pagination/Pagination";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { useGetCurrentData } from "@/layouts/LayoutCardPages/hooks/useGetCurrentData";
import { getSession } from "next-auth/react";

export default function Platform({ count, param }) {
  const data = useGetCurrentData("games", "stores", param);

  if (data?.detail) {
    return <InvalidPage detail={data.detail} />;
  }

  return (
    <>
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

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // Fetch the data for the specified slug
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}&stores=${
      context?.params?.slug[0]
    }&page_size=20&page=${context.query.page || 1}`
  );
  const data = await res.json();
  console.log(data, "kafdksfaks");

  return {
    props: {
      data: data.results || data,
      count: data.count || 0,
      param: context?.params?.slug[0],
      session,
    },
  };
}
