import { Pagination } from "@/components/Pagination/Pagination";
import { SecondaryCard } from "@/components/SecondaryCard/SecondaryCard";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { IData } from "@/layouts/LayoutCardPages/types";

export default function Developers({ data, count }: IData) {
  return (
    <>
      <SecondaryCard data={data} page="developers" />
      <div className={"layoutCardPages__Pagination"}>
        <Pagination count={count} />
      </div>
    </>
  );
}

Developers.getLayout = getLayoutCardPages;

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.rawg.io/api/developers?key=${process.env.API_KEY}&page_size=20`
  );
  const data = await res.json();

  return {
    props: {
      data: data.results,
      count: data.count,
    },
  };
}
