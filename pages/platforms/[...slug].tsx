import { Card } from "@/components/Card/Card";
import { Pagination } from "@/components/Pagination/Pagination";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";

export default function Platform({ data, count }) {
  return (
    <>
      <Card data={data} />
      <div className={"layoutCardPages__Pagination"}>
        <Pagination count={count} />
      </div>
    </>
  );
}

Platform.getLayout = getLayoutCardPages;

export async function getServerSideProps(context) {
  // Fetch the data for the specified slug
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}&platforms=${context?.params?.slug[0]}&page_size=20`
  );
  const data = await res.json();

  return {
    props: {
      data: data.results,
      count: data.count,
    },
  };
}
