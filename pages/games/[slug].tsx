import { GetStaticProps } from "next";
import { getLayoutDefault } from "@/layouts/LayoutDefault";

export default function Game({ data }) {
  return (
    <div>
      <p>{data.name}</p>
      <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
    </div>
  );
}

Game.getLayout = getLayoutDefault;

export async function getStaticPaths() {
  // Fetch data from external API
  const res = await fetch(`${process.env.GET_GAMES}`);
  const data = await res.json();

  const paths = data.results.map((result) => {
    return {
      params: { slug: result.slug },
    };
  });

  // Pass data to the page via props
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`http://localhost:3000/api/${context?.params?.slug}`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
};
