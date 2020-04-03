import { useEffect, useState, useCallback } from "react";
import { useWindowSize, useStore } from "../hooks";
import { UsePanelStateProps } from "../types";

const getX = (windowWidth, width) => {
  const x = windowWidth / 2 - (width / 2);
  return x
}

const getY = (windowHeight, height) => {
  let y = 0;
  if (typeof window !== "undefined") {
    typeof window !== "undefined"
      y = window.scrollY - windowHeight / 2 + (height / 2);
  }
  return y;
}

export default function usePanelState({ show }: UsePanelStateProps) {
  const [theme, setTheme] = useState("Dark");
  const { get, set, ready } = useStore({ store: "SWRDevtools" });
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(800);
  //@ts-ignore
  const handleResize = useCallback(async (e: MouseEvent | TouchEvent, dir: any, refToElement: React.ElementRef<'div'>) => {
    await set("width", refToElement.offsetWidth);
    setWidth(refToElement.offsetWidth);
    await set("height", refToElement.offsetHeight);
    setHeight(refToElement.offsetHeight);
  }, [ready, set])
  const handleChangeTheme = useCallback(
    async (theme) => {
      await set("theme", theme);
      setTheme(theme);
    },
    [set, show]
  );

  useEffect(() => {
    get("theme").then((theme) => {
      if (theme) setTheme(theme);
    });
    get("width").then((width) => {
      if (width) setWidth(width);
    })
    get("height").then(height => {
      if (height) setHeight(height);
    })
  }, [ready]);

  return {
    theme,
    handleChangeTheme,
    handleResize,
    x: getX(windowWidth, width),
    y: getY(windowHeight, height),
    height,
    width
  };
}
