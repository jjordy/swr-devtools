import { useState, useCallback, useEffect } from "react";
import { useWindowSize } from "../hooks";
import { UsePanelStateProps } from "../types";

const getX = (windowWidth, width) => {
  let x = 0;
  if (typeof window !== "undefined") {
    x = windowWidth / 2 - width / 2;
  }
  return x;
};

const getY = (windowHeight, _height) => {
  let y = 0;
  if (typeof window !== "undefined") {
    y = (windowHeight / 2) + window.scrollY - 200;
  }
  return y;
};

export default function usePanelState({ show }: UsePanelStateProps) {
  const [theme, setTheme] = useState("Dark");
  const [resizing, setResizing] = useState(false);
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(400);

  useEffect(() => {
    const existingSelectedTheme = localStorage.getItem("__SWR__DEVTOOLS__THEME__");
    if (existingSelectedTheme) {
      setTheme(existingSelectedTheme);
    }
  }, [])
  const handleResize = useCallback(
    async (
      //@ts-ignore
      e: MouseEvent | TouchEvent,
      //@ts-ignore
      dir: any,
      refToElement: React.ElementRef<"div">
    ) => {
      setWidth(refToElement.offsetWidth);
      setHeight(refToElement.offsetHeight);
      setResizing(false);
    },
    [setResizing, setWidth, setHeight]
  );
  const handleChangeTheme = useCallback(
    async (theme) => {
      localStorage.setItem("__SWR__DEVTOOLS__THEME__", theme);
      setTheme(theme);
    },
    [show]
  );
  return {
    theme,
    handleChangeTheme,
    handleResize,
    resizing,
    setResizing,
    x: getX(windowWidth, width),
    y: getY(windowHeight, height),
    height,
    width,
  };
}
