import { useEffect, useState, useCallback } from "react";
import { useWindowSize, useStore } from "../hooks";
import { UsePanelStateProps } from "../types";

export default function usePanelState({
  toolbarPosition,
  show,
  previousToolbarPosition
}: UsePanelStateProps) {
  const [theme, setTheme] = useState("Dark");
  const [isDragging, setIsDragging] = useState(false);
  const { get, set, ready } = useStore({ store: "SWRDevtools" });
  const { width, height } = useWindowSize();

  const [size, setSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 400,
    height: height
  });

  const [position, setPosition] = useState({
    x: typeof window !== "undefined" ? window.scrollX : 0,
    y: typeof window !== "undefined" ? window.scrollY : 0
  });

  const handleResize = useCallback(
    //@ts-ignore
    (e: any, direction: any, ref: any, delta: any, position: any) => {
      setSize({
        width: ref.offsetWidth,
        height: ref.offsetHeight
      });
      setPosition({ x: position.x, y: position.y });
      setIsDragging(false);
      set("width", ref.offsetWidth).catch(err => console.warn(err));
    },
    []
  );
  const handleChangeTheme = useCallback(
    async theme => {
      await set("theme", theme);
      setTheme(theme);
    },
    [set]
  );

  useEffect(() => {
    get("theme").then(theme => {
      if (theme) {
        setTheme(theme);
      }
    });
    get("width").then(width => {
      if (width) {
        setSize({ width, height });
      }
    });
  }, [ready]);

  useEffect(() => {
    if (toolbarPosition === "right") {
      setPosition({ x: width - size.width, y: window.scrollY });
    }
    if (toolbarPosition === "left") {
      setPosition({ x: 0, y: window.scrollY });
    }
  }, [show]);

  useEffect(() => {
    if (toolbarPosition === "right") {
      setSize({ height, width: 400 });
      setPosition({ x: width - 400, y: position.y });
    }
    if (toolbarPosition === "left") {
      setSize({ height, width: 400 });
      setPosition({ x: 0, y: position.y });
    }
  }, [toolbarPosition, width, height]);

  return {
    theme,
    setIsDragging,
    handleChangeTheme,
    handleResize,
    isDragging,
    position,
    size
  };
}
