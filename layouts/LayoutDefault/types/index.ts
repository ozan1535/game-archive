import { Dispatch, SetStateAction } from "react";
import { KeyedMutator } from "swr";
import { IUserCommentData } from "@/pages/api/firebase";

export interface ICount {
  count: number;
}

export interface ICountWithParam extends ICount {
  param?: string;
}

export interface ISecondaryCardGame {
  added: number;
  id: number;
  name: string;
  slug: string;
}

export interface ISecondaryCardData {
  domain: string;
  games: ISecondaryCardGame[];
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
}

export interface ISecondaryCardProps {
  data: ISecondaryCardData[];
  page: string;
}

export interface IGenre {
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
}

export interface IFavourite {
  gameGenres: {
    genres: IGenre[];
  };
  gameId: string;
  gameImage: string;
  gameName: string;
  gameRating: number;
  gameRelease: string;
  gameSlug: string;
}

export interface ICardData {
  background_image: string;
  genres: IGenre[];
  id: string;
  name: string;
  rating: number;
  released: string;
  slug: string;
}

export interface ICardProps {
  data: ICardData[];
  setUpdatedData?: Dispatch<SetStateAction<IFavourite[]>> | null;
}

export interface IClip {
  clip: string;
  clips: {
    "320": string;
    "640": string;
    full: string;
  };
  video: string;
  preview: string;
}

export interface IGameInfo {
  name: string;
  description: string;
  metacritic: number;
  released: string;
  rating: number;
  ratings_count: number;
  playtime: number;
  screenshots_count: number;
  achievements_count: number;
  developers: IDeveloper[];
  publishers: IPublisher[];
  description_raw: string;
  metacritic_platforms: IMetacriticPlatform[];
  platforms: IPlatform[];
  stores: IStore[];
  website: string;
  reddit_url: string;
  metacritic_url: string;
  reactions: { [key: string]: number };
  ratings: IRating[];
  added: number;
  added_by_status: IAddedByStatus;
  tags: ITag[];
  background_image: string;
  genres: IGenre[];
  slug: string;
  clip: IClip;
}

export interface IDeveloper {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface IPublisher {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface IMetacriticPlatform {
  metascore: number;
  url: string;
  platform: {
    platform: number;
    name: string;
    slug: string;
  };
}

export interface IPlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
  released_at: string;
  requirements: Record<string, unknown>;
}

export interface IStore {
  id: number;
  url: string;
  store: {
    id: number;
    name: string;
    slug: string;
    domain: string;
    games_count: number;
    image_background: string;
  };
}

export interface IRating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface IAddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

export interface ITag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

export interface IPageHead {
  title: string;
  description: string;
  keywords: string;
  canAddSlug?: boolean;
}

export interface ICommentsFail {
  success: boolean;
}

export interface IComment {
  defaultText: string;
  dataComment: ICommentsFail | IUserCommentData;
  canEdit: boolean;
  mutate?: KeyedMutator<any>;
}

export interface ICardHeart {
  data: ICardData;
  favouriteItems: IFavourite[] | undefined;
  fetchFavouriteItems: () => Promise<void>;
}
