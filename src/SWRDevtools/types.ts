import React from "react";

export type ToolbarPositions = "right" | "left" | "bottom" | "";

export interface SWRDevtoolsProps {
  children: React.ReactNode;
  /** Custom open component to be rendered inside the open button */
  CustomOpenComponent?: React.ReactNode;
  /** This will print relavent position information to the console */
  debug?: boolean;
  /** Default the devtools to being open on render */
  defaultOpen?: boolean;
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
    theme,
    width,
    resizing,
  }: {
    theme: string;
    width: number;
    resizing: boolean;
  }) => React.ReactNode;
  setToolbarPosition: (position: ToolbarPositions) => void;
  toggleShow: () => void;
  debug?: boolean;
}

export interface KeysProps {
  keys: string[];
  selectedKey: string;
  onSelect: (key: string) => void;
  onClear: (key: string) => void;
  onRevalidate: (key: string) => void;
  theme: string;
  children?: React.ReactNode;
  panelWidth?: number;
}

export interface DataProps {
  JsonViewer: any;
  toolbarPosition: ToolbarPositions;
  data: any;
  resizing?: boolean;
  theme: string;
  cacheKey: string;
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
