import { Card } from "@/components/Card/Card";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";

export default function Platform({ data }) {
  console.log(data);

  return <Card data={data} />;
}

Platform.getLayout = getLayoutCardPages;

export async function getStaticPaths() {
  // Fetch data from external API
  const res = await fetch(
    "https://api.rawg.io/api/stores?key=6f43fbe9adea45828438d5dc7b72c345"
  );
  const data = await res.json();

  const paths = data.results.map((result) => {
    return {
      params: { slug: [`${result.id}`, `${result.slug}`] },
    };
  });

  // Pass data to the page via props
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=6f43fbe9adea45828438d5dc7b72c345&stores=${context?.params?.slug[0]}`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data: data.results } };
};
