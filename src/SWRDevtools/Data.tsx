import React, { useEffect, useRef } from "react";

export default function Data({ data, toolbarPosition }: any) {
  //@ts-ignore
  let ReactJson = useRef((props: any) => <></>);
  useEffect(() => {
    ReactJson.current = require('react-json-view').default;
  }, [])
  const getStyles = () => {
    if (toolbarPosition === "right" || toolbarPosition === "left") {
      return {
        height: "90vh"
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
        <ReactJson.current
          collapsed={1}
          displayDataTypes={false}
          indentWidth={2}
          src={data || {}}
          theme="tube"
        />
      </div>
    </div>
  );
}
