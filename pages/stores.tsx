import { SecondaryCard } from "@/components/SecondaryCard/SecondaryCard";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { IData } from "@/layouts/LayoutCardPages/types";

export default function Stores({ data }: IData) {
  return <SecondaryCard data={data} page="stores" />;
}

Stores.getLayout = getLayoutCardPages;

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.rawg.io/api/stores?key=${process.env.API_KEY}`
  );
  const data = await res.json();

  return {
    props: {
      data: data.results,
    },
  };
}
