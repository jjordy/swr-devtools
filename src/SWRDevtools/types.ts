import { mutateInterface } from "swr/dist/types";
import { CacheInterface } from "swr";

export type ToolbarPositions = "right" | "left" | "bottom";

export interface SWRDevtoolsProps {
  children: React.ReactNode;
  CustomOpenComponent?: React.ReactNode;
  debug?: boolean;
  cache: CacheInterface;
  mutate: mutateInterface;
  position?: ToolbarPositions;
}