import { SecondaryCard } from "@/components/SecondaryCard/SecondaryCard";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { IData } from "@/layouts/LayoutCardPages/types";

export default function Genres({ data }: IData) {
  return <SecondaryCard data={data} />;
}

Genres.getLayout = getLayoutCardPages;

export async function getStaticProps() {
  const response = await fetch(`${process.env.GET_GENRES}`);
  const data = await response.json();

  return {
    props: { data: data.results },
  };
}
