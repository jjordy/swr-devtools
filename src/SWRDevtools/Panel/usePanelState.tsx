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
  const [currentSize, setSizeCurrent] = useState<{
    width: number;
    height: number;
  }>({
    width: 400,
    height: height
  });
  const [position, setPosition] = useState({
    x: 0,
    y: 0
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
    },
    []
  );

  const handleResizeCurrent = useCallback(
    //@ts-ignore
    (e: any, direction: any, ref: any, delta: any, position: any) => {
      setSizeCurrent({
        width: ref.offsetWidth,
        height: ref.offsetHeight
      });
    },
    []
  );
  const handleChangeTheme = useCallback(
    async theme => {
      console.log(theme);
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
  }, [ready]);

  useEffect(() => {
    if (toolbarPosition === "right") {
      setPosition({ x: width - size.width, y: window.scrollY });
    }
    if (toolbarPosition === "left") {
      setPosition({ x: 0, y: window.scrollY });
    }
    if (toolbarPosition === "bottom") {
      setPosition({ x: 0, y: window.scrollY + (height - size.height) });
    }
  }, [show]);

  useEffect(() => {
    if (toolbarPosition === "right") {
      setSize({ height, width: 400 });
      if (previousToolbarPosition === "bottom") {
        setPosition({
          x: width - 400,
          y: window.scrollY
        });
      } else {
        setPosition({ x: width - 400, y: position.y });
      }
    }
    if (toolbarPosition === "left") {
      setSize({ height, width: 400 });
      if (previousToolbarPosition === "bottom") {
        setPosition({
          x: 0,
          y: window.scrollY
        });
      } else {
        setPosition({ x: 0, y: position.y });
      }
    }
    if (toolbarPosition === "bottom") {
      setSize({ width: width, height: 300 });
      setPosition({ x: 0, y: position.y + (height - 500) });
    }
  }, [toolbarPosition, width, height]);

  return {
    theme,
    setIsDragging,
    handleChangeTheme,
    handleResize,
    handleResizeCurrent,
    isDragging,
    position,
    size,
    currentSize
  };
}
