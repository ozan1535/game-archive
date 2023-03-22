import { Pagination } from "@/components/Pagination/Pagination";
import { SecondaryCard } from "@/components/SecondaryCard/SecondaryCard";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { useGetCurrentData } from "@/layouts/LayoutCardPages/hooks/useGetCurrentData";
import { IData } from "@/layouts/LayoutCardPages/types";

export default function Platforms({ count }: IData) {
  const data = useGetCurrentData("platforms");

  return (
    <>
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

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://api.rawg.io/api/platforms?key=${
      process.env.API_KEY
    }&page_size=20&page=${context.query.page || 1}`
  );
  const data = await res.json();

  return {
    props: {
      data: data.results,
      count: data.count,
    },
  };
}
