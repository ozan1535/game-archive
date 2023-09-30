import { Dispatch, SetStateAction } from "react";
import { KeyedMutator } from "swr";
import { IUserCommentData } from "@/pages/api/firebase";

export interface IRequestDialogProps {
  comment: IUserCommentData | undefined;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  requestType: string;
  mutate?: KeyedMutator<any>;
}
