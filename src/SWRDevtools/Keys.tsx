import React from "react";
import CloseIcon from "./Icons/CloseIcon";
import ReloadIcon from "./Icons/ReloadIcon";

export default function Keys({
  keys,
  selectedKey,
  onSelect,
  onClear,
  onRevalidate
}: any) {
  return (
    <div style={{ textOverflow: "ellipsis", height: "40vh" }}>
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
                justifyContent: "flex-end",
                marginTop: "0.5rem",
                alignItems: "center"
              }}
            >
              <button
                onClick={() => onClear(cacheKey)}
                style={{
                  border: 0,
                  backgroundColor: "#D9528480",
                  color: "#fff",
                  fontWeight: "bolder",
                  fontSize: 12,
                  borderRadius: 6,
                  padding: "0.5rem",
                  cursor: "pointer",
                  marginRight: "0.5rem",
                  textTransform: "uppercase"
                }}
              >
                <CloseIcon />
              </button>
              <button
                onClick={() => onRevalidate(cacheKey)}
                style={{
                  border: 0,
                  backgroundColor: "#044BD980",
                  color: "#fff",
                  fontWeight: "bolder",
                  fontSize: 12,
                  borderRadius: 6,
                  cursor: "pointer",
                  padding: "0.5rem",
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
