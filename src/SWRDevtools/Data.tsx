import React, { useEffect, memo } from "react";
import themes from "./themes";
import { DataProps } from "./types";

const isPrimitive = (val) => {
  if (val === null) {
    return true;
  }

  if (typeof val == "object" || typeof val == "function") {
    return false;
  } else {
    return true;
  }
};

export default memo(function Data({ JsonViewer, data, theme, resizing }: DataProps) {
  useEffect(() => {
    JsonViewer.current = require("react-json-view").default;
  }, []);
  return (
    <div style={{ position: "relative", backgroundColor: "#222" }}>
      <div
        style={{
          padding: 0,
          textAlign: "left",
          overflowY: "scroll",
          width: "100%",
          maxHeight: 400,
          boxSizing: "border-box",
          ...themes[theme].data,
        }}
      >
        {!resizing && (
          <JsonViewer.current
            collapsed={1}
            displayDataTypes={false}
            indentWidth={2}
            src={!resizing && isPrimitive(data) ? { data: data } : data}
            theme={theme === "Dark" ? "tube" : "shapeshifter:inverted"}
          />
        )}
      </div>
    </div>
  );
});
