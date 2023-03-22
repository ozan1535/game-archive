import { Pagination } from "@/components/Pagination/Pagination";
import { SecondaryCard } from "@/components/SecondaryCard/SecondaryCard";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { IData } from "@/layouts/LayoutCardPages/types";

export default function Genres({ data, count }: IData) {
  return (
    <>
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

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.rawg.io/api/genres?key=${process.env.API_KEY}&page_size=20`
  );
  const data = await res.json();

  return {
    props: {
      data: data.results,
      count: data.count,
    },
  };
}
