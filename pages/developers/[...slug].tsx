import { Card } from "@/components/Card/Card";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";

export default function Platform({ data }) {
  return <Card data={data} />;
}

Platform.getLayout = getLayoutCardPages;

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}&developers=${context?.params?.slug[0]}`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data: data.results } };
}
