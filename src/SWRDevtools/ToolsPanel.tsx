import React, { useState, useCallback, useEffect } from "react";
import { Rnd } from "react-rnd";
import { useStore, useWindowSize } from "./hooks";
import { ToolbarPositions } from "./types";

import AlignRightIcon from "./Icons/AlignRightIcon";
import AlignLeftIcon from "./Icons/AlignLeftIcon";
import AlignBottomIcon from "./Icons/AlignBottomIcon";
import GithubIcon from "./Icons/GithubIcon";
import CloseIcon from "./Icons/CloseIcon";

interface ToolsPanelProps {
  toolbarPosition: string;
  previousToolbarPosition: string;
  show: boolean;
  children: ({ isDragging, theme }: { isDragging: boolean, theme: string}) => React.ReactNode;
  setToolbarPosition: (position: ToolbarPositions) => void;
  toggleShow: () => void;
  debug?: boolean;
}

interface Themes {
  [key: string]: {
    container: {
      backgroundImage?: string
      backgroundColor?: string
    }
  }
}

const themes: Themes = {
  Dark: {
    container: {
      backgroundImage: "linear-gradient(90deg,#0f2027,#203a43,#2c5364)"
    }
  },
  Light: {
    container: {
      backgroundImage: "linear-gradient(120deg,#a6c0fe,#f68084)"
    }
  }
};

export default function ToolsPanel({
  toolbarPosition,
  previousToolbarPosition,
  show,
  children,
  setToolbarPosition,
  toggleShow,
  debug
}: ToolsPanelProps) {
  const [theme, setTheme] = useState("Dark");
  const [isDragging, setIsDragging] = useState(false);
  const { get, set } = useStore({ store: "SWRDevtools" });
  const { width, height } = useWindowSize();
  const [size, setSize] = useState<{
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
      if (debug) {
        console.log(direction, delta, position);
        console.log(
          `Size - Width: ${ref.offsetWidth}, Height: ${ref.offsetHeight}`
        );
        console.log(`Position - x: ${position.x}, y: ${position.y}`);
      }
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
  }, []);
  useEffect(() => {
    const pos = document.body.getBoundingClientRect();
    setPosition({ x: 0, y: pos.bottom })
  }, [show])
  useEffect(() => {
    if (toolbarPosition === "right") {
      setSize({ height, width: 400 });
      if (previousToolbarPosition === "bottom") {
        setPosition({
          x: width - 400,
          y: position.y - height + size.height
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
          y: position.y - height + size.height
        });
      } else {
        setPosition({ x: 0, y: position.y });
      }
    }
    if (toolbarPosition === "bottom") {
      setPosition({ x: 0, y: position.y + (height - 300) });
      setSize({ width: width, height: 300 });
    }
  }, [toolbarPosition, width, height]);
  return (
    <>
      {show && (
        <Rnd
          position={position}
          size={size}
          onResizeStart={() => setIsDragging(true)}
          onResizeStop={handleResize}
          enableResizing={{
            top: toolbarPosition === "bottom",
            right: toolbarPosition === "left",
            left: toolbarPosition === "right",
            topRight: false,
            topLeft: false,
            bottomRight: false,
            bottomLeft: false
          }}
          dragAxis="both"
          disableDragging
          bounds="parent"
          style={{
            cursor: "auto",
            position: "fixed",
            zIndex: 999999
          }}
        >
          <div
            style={{
              position: "relative",
              color: "#FFF",
              height: "100%",
              ...themes[theme].container
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                paddingLeft: "1rem",
                paddingRight: "2rem",
                alignItems: "center"
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 900,
                  userSelect: "none"
                }}
              >
                SWR Devtools
              </span>
              <div style={{ display: "flex" }}>
                <button
                  title="Align Bottom"
                  aria-label="Align Bottom"
                  type="button"
                  onClick={() => setToolbarPosition("bottom")}
                  style={{
                    border: 0,
                    padding: "0.5rem",
                    backgroundColor: "transparent"
                  }}
                >
                  <AlignBottomIcon />
                </button>
                <button
                  aria-label="Align Left"
                  title="Align Left"
                  type="button"
                  onClick={() => {
                    setToolbarPosition("left");
                  }}
                  style={{
                    border: 0,
                    padding: "0.5rem",
                    backgroundColor: "transparent"
                  }}
                >
                  <AlignLeftIcon />
                </button>
                <button
                  type="button"
                  aria-label="Align Right"
                  title="Align Right"
                  onClick={() => {
                    setToolbarPosition("right");
                  }}
                  style={{
                    border: 0,
                    padding: "0.5rem",
                    backgroundColor: "transparent"
                  }}
                >
                  <AlignRightIcon />
                </button>
                <button
                  type="button"
                  aria-label="Close SWR Devtools"
                  title="Close"
                  onClick={toggleShow}
                  style={{
                    border: 0,
                    padding: "0.5rem",
                    backgroundColor: "transparent"
                  }}
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
            {children({ isDragging, theme })}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: "2rem",
                paddingLeft: "2rem",
                boxSizing: "border-box"
              }}
            >
              <a
                target="_blank"
                href="https://github.com/jjordy/swr-devtools"
                aria-label="Check us out on Github"
              >
                <GithubIcon />
              </a>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label htmlFor="select_theme" style={{ marginRight: "1rem" }}>
                  Select Theme
                </label>
                <select
                  value={theme}
                  style={{
                    padding: "0.2rem",
                    border: "1px solid #e7e7e7",
                    color: theme === "Dark" ? "#fff" : "#000",
                    backgroundColor: theme === "Dark" ? "#555555cc" : "fff",
                    borderRadius: 4
                  }}
                  onChange={evt => handleChangeTheme(evt.target.value)}
                >
                  {Object.keys(themes).map(key => (
                    <option key={`select_theme_option_${key}`} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Rnd>
      )}
    </>
  );
}
