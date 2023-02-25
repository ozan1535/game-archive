import { SecondaryCard } from "@/components/SecondaryCard/SecondaryCard";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { IData } from "@/layouts/LayoutCardPages/types";

export default function Developers({ data }: IData) {
  return <SecondaryCard data={data} />;
}

Developers.getLayout = getLayoutCardPages;

export async function getStaticProps() {
  const response = await fetch(`${process.env.GET_DEVELOPERS}`);
  const data = await response.json();

  return { props: { data: data.results } };
}
