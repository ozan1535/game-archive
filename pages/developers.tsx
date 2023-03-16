import { SecondaryCard } from "@/components/SecondaryCard/SecondaryCard";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { IData } from "@/layouts/LayoutCardPages/types";

export default function Developers({ data }: IData) {
  return <SecondaryCard data={data} page="developers" />;
}

Developers.getLayout = getLayoutCardPages;

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.rawg.io/api/developers?key=${process.env.API_KEY}`
  );
  const data = await res.json();

  return {
    props: {
      data: data.results,
    },
  };
}
