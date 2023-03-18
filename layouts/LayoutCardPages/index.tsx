import { LayoutDefault } from "../LayoutDefault";
import { ILayoutCardPage } from "./types";

export function LayoutCardPages(props: ILayoutCardPage) {
  const { children } = props;

  return <div className="layoutCardPages">{children}</div>;
}

export function getLayoutCardPages(page: JSX.Element) {
  return (
    <LayoutDefault>
      <LayoutCardPages>{page}</LayoutCardPages>
    </LayoutDefault>
  );
}
