import { Card } from "@/components/Card/Card";
import { InvalidPage } from "@/components/InvalidPage/InvalidPage";
import { Pagination } from "@/components/Pagination/Pagination";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { useGetCurrentData } from "@/layouts/LayoutCardPages/hooks/useGetCurrentData";

export default function Platform({ count, param }) {
  const data = useGetCurrentData("games", "developers", param);

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
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}&developers=${
      context?.params?.slug[0]
    }&page_size=20&page=${context.query.page || 1}`
  );
  const data = await res.json();

  // Pass data to the page via props
  return {
    props: {
      data: data.results || data,
      count: data.count || 0,
      param: context?.params?.slug[0],
    },
  };
}
