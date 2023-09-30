import { Dispatch, SetStateAction } from "react";

export interface IDialogProps {
  title: string;
  showDialog: boolean;
  dialogText: string;
  canShowLogin: boolean;
}

export interface IDialogContextProps {
  dialogProps: IDialogProps;
  setDialogProps: Dispatch<SetStateAction<IDialogProps>>;
}
