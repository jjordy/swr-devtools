import React from "react";
import usePanelState from "./usePanelState";
import { Rnd } from "react-rnd";
import { PanelProps } from "../types";
import GithubIcon from "../Icons/GithubIcon";
import CloseIcon from "../Icons/CloseIcon";
import themes from "../themes";

export default function Panel({
  toolbarPosition,
  previousToolbarPosition,
  show,
  children,
  toggleShow,
  debug,
}: PanelProps) {
  const {
    theme,
    handleChangeTheme,
    width,
    height,
    x,
    y,
    setResizing,
    resizing,
    handleResize,
  } = usePanelState({
    toolbarPosition,
    previousToolbarPosition,
    debug,
    show,
  });
  return (
    <>
      {show && (
        <Rnd
          onResizeStop={handleResize}
          onResizeStart={() => {
            if (!resizing) {
              setResizing(true)
            }
          }}
          default={{
            x,
            y,
            width,
            height,
          }}
          style={{
            cursor: "auto",
            position: "fixed",
            zIndex: 999999,
          }}
        >
          <div style={themes[theme].container}>
            <div style={themes[theme].header}>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  userSelect: "none",
                }}
              >
                SWR Devtools
              </span>
              <div style={{ display: "flex" }}>
                <button
                  type="button"
                  aria-label="Close SWR Devtools"
                  title="Close"
                  onClick={toggleShow}
                  style={{
                    border: 0,
                    padding: "0.5rem",
                    backgroundColor: "transparent",
                  }}
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
            {children({ theme, width, resizing })}
            <div style={themes[theme].bottom}>
              <a
                target="_blank"
                href="https://github.com/jjordy/swr-devtools"
                aria-label="Check us out on Github"
              >
                <GithubIcon fill={theme === "Dark" ? "white" : "black"} />
              </a>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label
                  htmlFor="select_theme"
                  aria-label="Select a theme"
                  style={{
                    marginRight: "1rem",
                    color: theme === "Dark" ? "#FFF" : "#222",
                  }}
                ></label>
                <button
                  style={{ border: 0, backgroundColor: "transparent"}}
                  aria-label={`Toggle Theme - Current (${theme})`}
                  onClick={() => {
                    if (theme === "Dark") {
                      handleChangeTheme("Light");
                    } else {
                      handleChangeTheme("Dark");
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill={theme === "Dark" ? "#FFF" : "#000"}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Rnd>
      )}
    </>
  );
}
