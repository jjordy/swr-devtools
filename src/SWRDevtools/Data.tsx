import React, { useEffect, memo } from "react";

export default memo(function Data({ JsonViewer, data, toolbarPosition, theme = "tube" }: any) {

  useEffect(() => {
    JsonViewer.current = require("react-json-view").default;
  }, [])
  const getStyles = () => {
    if (toolbarPosition === "right" || toolbarPosition === "left") {
      return {
        height: "87vh"
      }
    }
    if (toolbarPosition === "bottom") {
      return {height: 246}
    }
    return {}
  }
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          padding: 0,
          textAlign: "left",
          overflowY: "scroll",
          boxSizing: "border-box",
          ...getStyles()
        }}
      >
        <JsonViewer.current
          collapsed={1}
          displayDataTypes={false}
          indentWidth={2}
          src={data || {}}
          theme={theme === "Dark" ? "tube" : "shapeshifter:inverted"}
        />
      </div>
    </div>
  );
})
