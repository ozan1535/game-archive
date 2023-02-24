import { SecondaryCard } from "@/components/SecondaryCard/SecondaryCard";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";

export default function Platforms({ data }) {
  return <SecondaryCard data={data} />;
}

Platforms.getLayout = getLayoutCardPages;

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.GET_PLATFORMS}`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
