import React from "react";
import CloseIcon from "../Icons/CloseIcon";
import ReloadIcon from "../Icons/ReloadIcon";

export default function KeyItem({ cacheKey, onSelect, selectedKey, onClear, onRevalidate }) {
  return (
    <div
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
          backgroundColor: "#044BD930",
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
              backgroundColor: "rebeccapurple",
              fontSize: 12,
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
            // fontFamily: "monospace",
            wordBreak: "break-all",
            textAlign: "center",
            fontSize: 10,
            letterSpacing: "0.05em",
            fontWeight: 600,
            textTransform: "uppercase",
            cursor: "pointer",
            padding: "0.2rem",
          }}
        >
          {cacheKey}
        </span>
      </div>
    </div>
  );
}
