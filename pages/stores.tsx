import { SecondaryCard } from "@/components/SecondaryCard/SecondaryCard";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";

export default function Stores({ data }) {
  return <SecondaryCard data={data} />;
}

Stores.getLayout = getLayoutCardPages;

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.GET_STORES}`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data: data.results } };
}
