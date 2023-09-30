import { useRouter } from "next/router";
import useSWR from "swr";

export function useGetCurrentData(
  slug: string,
  page: undefined | string = undefined,
  param: undefined | string | number = undefined
) {
  const router = useRouter();

  const { data } = useSWR(
    `/api/${slug}/${router.query.page || 1}/${page ? `${page}/${param}` : ""}`
  );

  return data;
}
