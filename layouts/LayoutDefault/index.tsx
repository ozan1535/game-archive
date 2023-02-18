import { Header } from "@/components/Header/Header";

export function LayoutDefault(props: any) {
  const { children } = props;
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
}

export const getLayoutDefault = (
  page: JSX.Element,
  props: any
): JSX.Element => <LayoutDefault {...props}>{page}</LayoutDefault>;
