import React, { useEffect, memo } from "react";
import themes from './themes';
import { useWindowSize } from "./hooks";

export default memo(function Data({ JsonViewer, toolbarPosition, data, theme, size }: any) {
  const { height } = useWindowSize();
  useEffect(() => {
    JsonViewer.current = require("react-json-view").default;
  }, [])
  const getStyles = () => {
    if (toolbarPosition === "right" || toolbarPosition === "left") {
      return {
        height: height - 300
      }
    }
    if (toolbarPosition === "bottom") {
      return {height: size.height - 100 }
    }
    return {}
  }
  return (
    <div style={{ position: "relative", backgroundColor: "#222" }}>
      <div
        style={{
          padding: 0,
          textAlign: "left",
          overflowY: "scroll",
          boxSizing: "border-box",
          ...getStyles(),
          ...themes[theme].data
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
