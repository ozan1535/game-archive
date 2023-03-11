import { SecondaryCard } from "@/components/SecondaryCard/SecondaryCard";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { IData } from "@/layouts/LayoutCardPages/types";

export default function Platforms({ data }: IData) {
  return <SecondaryCard data={data} page="platforms" />;
}

Platforms.getLayout = getLayoutCardPages;

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.GET_PLATFORMS}`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data: data.results } };
}
