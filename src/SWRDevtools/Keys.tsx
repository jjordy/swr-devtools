import React from "react";
import CloseIcon from "./Icons/CloseIcon";
import ReloadIcon from "./Icons/ReloadIcon";
import themes from "./themes";
import { KeysProps } from "./types";

export default function Keys({
  keys,
  selectedKey,
  onSelect,
  onClear,
  onRevalidate,
  theme,
}: KeysProps) {
  return (
    <div
      style={{
        textOverflow: "ellipsis",
        overflow: "scroll",
        position: "relative",
        minHeight: 400,
        height: "100%",
        ...themes[theme].keys,
      }}
    >
      <div
        style={{
          width: "100%",
          boxSizing: "border-box",
          backgroundColor: "#68E69EA3",
          padding: "0.5rem",
          fontSize: 14,
          fontWeight: 900,
          textOverflow: "ellipsis",
        }}
      >
        Cache Keys
      </div>
      {keys.map((cacheKey: string) => (
        <div
          key={cacheKey}
          onClick={() => onSelect(cacheKey)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            backgroundColor: cacheKey === selectedKey ? "#90DAE880" : undefined,
            // padding: "0.4rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.2rem",
              justifyContent: "stretch",
              backgroundColor: "#044BD980",
            }}
          >
            <div style={{ backgroundColor: "#D9528480" }}>
              <button
                title="Clear Item"
                onClick={() => onClear(cacheKey)}
                style={{
                  border: 0,
                  color: "#fff",
                  fontWeight: "bolder",
                  height: "auto",
                  fontSize: 12,
                  borderBottomRightRadius: 6,
                  borderBottomLeftRadius: 6,
                  padding: "0.6rem",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                <CloseIcon />
              </button>
            </div>
            <button
              title="Revalidate"
              onClick={() => onRevalidate(cacheKey)}
              style={{
                border: 0,
                color: "#fff",
                fontWeight: "bolder",
                fontSize: 12,
                height: "auto",
                backgroundColor: "#90DAE880",
                cursor: "pointer",
                padding: "0.6rem",
                textTransform: "uppercase",
              }}
            >
              <ReloadIcon />
            </button>
            <span
              style={{
                flex: "1 1 auto",
                fontFamily: "monospace",
                wordBreak: "break-all",
                textAlign: "center",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                padding: "0.2rem"
              }}
            >
              {cacheKey}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
