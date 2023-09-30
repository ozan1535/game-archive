import { IPlatform } from "@/layouts/LayoutDefault/types";

export interface ISingleGamePlatform {
  platform: IPlatform["platform"];
  released_at: string;
  requirements: any;
}
