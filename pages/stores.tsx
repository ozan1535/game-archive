import { SecondaryCard } from "@/components/SecondaryCard/SecondaryCard";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { IData } from "@/layouts/LayoutCardPages/types";

export default function Stores({ data }: IData) {
  return <SecondaryCard data={data} page="stores" />;
}

Stores.getLayout = getLayoutCardPages;

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.GET_STORES}`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data: data.results } };
}
