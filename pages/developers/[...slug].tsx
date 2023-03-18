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
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}&developers=${context?.params?.slug[0]}&page_size=20`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data: data.results, count: data.count } };
}
