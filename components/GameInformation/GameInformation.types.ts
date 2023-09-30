import {
  IDeveloper,
  IGenre,
  IPublisher,
  ITag,
} from "@/layouts/LayoutDefault/types";

export interface IGameInformation {
  items: IGenre[] | IDeveloper[] | IPublisher[] | ITag[];
  hasLink: boolean;
}
