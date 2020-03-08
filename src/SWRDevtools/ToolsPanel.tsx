import React, { useState, useCallback, useEffect } from "react";
import AlignRightIcon from "./Icons/AlignRightIcon";
import AlignLeftIcon from "./Icons/AlignLeftIcon";
import AlignBottomIcon from "./Icons/AlignBottomIcon";
import useWindowSize from "./useWindowSize";
import { Rnd } from "react-rnd";

export default function ToolsPanel({
  toolbarPosition,
  show,
  children,
  setToolbarPosition,
  toggleShow,
  debug
}: any) {
  const [isDragging, setIsDragging] = useState(false);
  const { width, height } = useWindowSize();
  if (debug) {
    console.log(`Width: ${width}, Height: ${height}`);
  }
  const [size, setSize] = useState<{ width: number; height: number | string }>({
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
      setSize({ width: ref.style.width, height: ref.style.height });
      setPosition({ x: position.x, y: position.y });
      setIsDragging(false);
      if (debug) {
        console.log(
          `Size - Width: ${ref.style.width}, Height: ${ref.style.height}`
        );
        console.log(`Position - x: ${position.x}, y: ${position.y}`);
      }
    },
    []
  );
  useEffect(() => {
    if (toolbarPosition === "right") {
      setSize({ height, width: 400 });
      setPosition({ x: width - 400, y: 0 });
    }
    if (toolbarPosition === "left") {
      setSize({ height, width: 400 });
      setPosition({ x: 0, y: 0 });
    }
    if (toolbarPosition === "bottom") {
      setPosition({ x: 0, y: height - 300 });
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
          bounds="body"
          style={{ cursor: "auto", position: "fixed" }}
        >
          <div
            style={{
              position: "relative",
              color: "#FFF",
              height: "100%",
              backgroundImage: "linear-gradient(90deg,#0f2027,#203a43,#2c5364)"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
                alignItems: "center"
              }}
            >
              <span
                style={{ fontSize: 16, fontWeight: 900, userSelect: "none" }}
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
                    backgroundColor: "transparent"
                  }}
                >
                  <span role="img" aria-label="Close">
                    ❌
                  </span>
                </button>
              </div>
            </div>
            {children({ isDragging })}
          </div>
        </Rnd>
      )}
    </>
  );
}
