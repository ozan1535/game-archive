import { DialogContextProvider } from "@/components/Dialog/DialogContext";
import { Header } from "@/components/Header/Header";

export function LayoutDefault(props: any) {
  const { children } = props;
  return (
    <DialogContextProvider>
      <div>
        <Header />
        <div>{children}</div>
      </div>
    </DialogContextProvider>
  );
}

export const getLayoutDefault = (
  page: JSX.Element,
  props: any
): JSX.Element => <LayoutDefault {...props}>{page}</LayoutDefault>;
