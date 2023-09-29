import {
  Context,
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";
import { Dialog } from "./Dialog";

let dialogContextStates: Context<IDeleteDialogContextProps>;

const dialogProps = {
  title: "Level Up!",
  showDialog: false,
  dialogText:
    "In order to comment to this game and enjoy the website, please log in.",
  canShowLogin: true,
};

const { Provider } = (dialogContextStates =
  createContext<IDeleteDialogContextProps>({
    dialogProps,
    setDialogProps: () => dialogProps,
  }));

export const useDialogContext: () => IDeleteDialogContextProps = () =>
  useContext(dialogContextStates);

export function DialogContextProvider(props: { children: ReactElement }) {
  const [dialogProps, setDialogProps] = useState<IdialogProps>({
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
