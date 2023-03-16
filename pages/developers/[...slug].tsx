import { Card } from "@/components/Card/Card";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";

export default function Platform({ data }) {
  console.log(data);

  return <Card data={data} />;
}

Platform.getLayout = getLayoutCardPages;

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=6f43fbe9adea45828438d5dc7b72c345&developers=${context?.params?.slug[0]}`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data: data.results } };
}
