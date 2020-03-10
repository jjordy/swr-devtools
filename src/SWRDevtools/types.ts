import { mutateInterface } from "swr/dist/types";
import { CacheInterface } from "swr";

export type ToolbarPositions = "right" | "left" | "bottom" | "";

export interface SWRDevtoolsProps {
  /** The SWR Cache  */
  cache: CacheInterface;
  /** Your application */
  children: React.ReactNode;
  /** Custom open component to be rendered inside the open button */
  CustomOpenComponent?: React.ReactNode;
  /** This will print relavent position information to the console */
  debug?: boolean;
  /** Default the devtools to being open on render */
  defaultOpen?: boolean;
  /** The SWR mutate function */
  mutate: mutateInterface;
  /** The default position you would like the devtools to appear in. */
  position?: ToolbarPositions;
  /** Customize the position of the open button / component */
  openBtnPosition?: "left" | "right";
}

export interface UsePanelStateProps {
  debug?: boolean;
  toolbarPosition: ToolbarPositions;
  previousToolbarPosition: ToolbarPositions;
  show: boolean;
}

export interface PanelProps {
  toolbarPosition: ToolbarPositions;
  previousToolbarPosition: ToolbarPositions;
  show: boolean;
  children: ({
    isDragging,
    theme,
    size
  }: {
    isDragging: boolean;
    theme: string;
    size: { width: number; height: number };
  }) => React.ReactNode;
  setToolbarPosition: (position: ToolbarPositions) => void;
  toggleShow: () => void;
  debug?: boolean;
}

export interface Themes {
  [key: string]: Theme;
}

export interface Theme {
  container: {
    [key: string]: any;
  };
  header: {
    [key: string]: any;
  };
  keys: {
    [key: string]: any;
  };
  data: {
    [key: string]: any;
  };
  bottom: {
    [key: string]: any;
  };
}
