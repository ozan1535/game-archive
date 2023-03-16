import { Card } from "@/components/Card/Card";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";

export default function Platform({ data }) {
  return <Card data={data} />;
}

Platform.getLayout = getLayoutCardPages;

export async function getServerSideProps(context) {
  // Fetch the data for the specified slug
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}&genres=${context?.params?.slug[0]}`
  );
  const data = await res.json();

  return {
    props: {
      data: data.results,
    },
  };
}
