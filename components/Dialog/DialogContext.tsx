import {
  Context,
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";
import { Dialog } from "./Dialog";
import { IDialogContextProps, IDialogProps } from "./Dialog.types";

let dialogContextStates: Context<IDialogContextProps>;

const dialogProps = {
  title: "Level Up!",
  showDialog: false,
  dialogText:
    "In order to comment to this game and enjoy the website, please log in.",
  canShowLogin: true,
};

const { Provider } = (dialogContextStates = createContext<IDialogContextProps>({
  dialogProps,
  setDialogProps: () => dialogProps,
}));

export const useDialogContext: () => IDialogContextProps = () =>
  useContext(dialogContextStates);

export function DialogContextProvider(props: { children: ReactElement }) {
  const [dialogProps, setDialogProps] = useState<IDialogProps>({
    title: "Level Up!",
    showDialog: false,
    dialogText:
      "In order to comment to this game and enjoy the website, please log in.",
    canShowLogin: true,
  });

  const context = {
    dialogProps,
    setDialogProps,
  };

  return (
    <Provider value={context}>
      {props.children}
      {dialogProps.showDialog && <Dialog />}
    </Provider>
  );
}
