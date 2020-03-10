import React from "react";
import CloseIcon from "./Icons/CloseIcon";
import ReloadIcon from "./Icons/ReloadIcon";
import themes from "./themes";

export default function Keys({
  keys,
  selectedKey,
  onSelect,
  onClear,
  onRevalidate,
  theme
}: any) {
  return (
    <div
      style={{
        textOverflow: "ellipsis",
        height: "100%",
        ...themes[theme].keys
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
          textOverflow: "ellipsis"
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
            padding: "1rem"
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              wordBreak: "break-all",
              fontSize: 12,

              cursor: "pointer"
            }}
          >
            {cacheKey}
          </span>
          {cacheKey === selectedKey && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginTop: "0.5rem",
                alignItems: "center"
              }}
            >
              <button
                title="Clear Item"
                onClick={() => onClear(cacheKey)}
                style={{
                  border: 0,
                  backgroundColor: "#D9528480",
                  color: "#fff",
                  fontWeight: "bolder",
                  fontSize: 12,
                  borderRadius: 6,
                  padding: "0.2rem",
                  cursor: "pointer",
                  marginRight: "0.5rem",
                  textTransform: "uppercase"
                }}
              >
                <CloseIcon />
              </button>
              <button
                title="Revalidate"
                onClick={() => onRevalidate(cacheKey)}
                style={{
                  border: 0,
                  backgroundColor: "#044BD980",
                  color: "#fff",
                  fontWeight: "bolder",
                  fontSize: 12,
                  borderRadius: 6,
                  cursor: "pointer",
                  padding: "0.2rem",
                  textTransform: "uppercase"
                }}
              >
                <ReloadIcon />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
