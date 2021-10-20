import React, { useState, useEffect, useRef, useMemo } from "react";
import Data from "./Data";
import Keys from "./Keys";
import Panel from "./Panel";
import { ToolbarPositions, SWRDevtoolsProps } from "./types";
import { usePrevious } from "./hooks";
import { useSWRConfig } from "swr";
import DefaultOpenComponent from "./DefaultOpenComponent";

export function SWRDevtoolsInternal({
  debug = false,
  position = "right",
  CustomOpenComponent,
  openBtnPosition = "left",
  defaultOpen = false,
}: SWRDevtoolsProps) {
  const [data, setData] = useState({});
  const { cache, mutate } = useSWRConfig();
  const [show, toggleShow] = useState(false);
  //@ts-ignore
  const ReactJson = useRef((props: any) => <></>);
  const [toolbarPosition, setToolbarPosition] =
    useState<ToolbarPositions>(position);
  const prevPosition = usePrevious(toolbarPosition);
  const [selectedCacheItemData, setSelectedCacheItemData] = useState(null);
  const [selectedCacheKey, setSelectedCacheKey] = useState<string | null>(null);
  const handleToggleShow = () => toggleShow(!show);
  const handlePostMessage = (event) => {
    console.log(event);
    if (event.data) {
      const { key, value } = event.data;
      setData({ ...data, [key]: value });
    }
  };
  useEffect(() => {
    console.log("Message listenered added for SWR - Devtools");
    window.addEventListener("message", handlePostMessage);
    return () => {
      window.removeEventListener("message", handlePostMessage);
    };
  }, [handlePostMessage]);
  useEffect(() => toggleShow(defaultOpen), [defaultOpen]);

  const handleSelectedCacheItem = (key: string) => {
    setSelectedCacheKey(key);
    setSelectedCacheItemData(cache.get(key));
  };

  const clearCacheByKey = (key: string) => {
    cache.set(key, null);
  };

  const revalidate = (_key: string) => {
    mutate(_key).then((d) => setSelectedCacheItemData(d));
  };
  const keys = useMemo(() => (data ? Object.keys(data) : []), [data]);
  return (
    <>
      {!show && (
        <div
          style={{
            position: "fixed",
            boxSizing: "border-box",
            bottom: 0,
            left: openBtnPosition === "left" ? 150 : null,
            right: openBtnPosition === "right" ? 150 : null,
            zIndex: 999999,
          }}
        >
          <button
            title="Open SWR Devtools"
            onClick={handleToggleShow}
            style={{
              border: 0,
              backgroundColor: "transparent",
              boxSizing: "border-box",
            }}
          >
            {CustomOpenComponent || DefaultOpenComponent}
          </button>
        </div>
      )}
      <Panel
        show={show}
        debug={debug}
        toolbarPosition={toolbarPosition}
        previousToolbarPosition={prevPosition || ""}
        setToolbarPosition={setToolbarPosition}
        toggleShow={handleToggleShow}
      >
        {({ theme, width: panelWidth, resizing }) => (
          <div
            style={{
              display: "flex",
              height: "100%",
              backgroundColor: theme === "Dark" ? "#231f20" : "#FFF",
              flex: toolbarPosition === "bottom" ? "1 1 auto" : 0,
            }}
          >
            <div style={{ position: "relative", boxSizing: "border-box" }}>
              <Keys
                theme={theme}
                keys={keys}
                panelWidth={panelWidth}
                selectedKey={selectedCacheKey}
                onSelect={handleSelectedCacheItem}
                onClear={clearCacheByKey}
                onRevalidate={revalidate}
              >
                <Data
                  theme={theme}
                  resizing={resizing}
                  data={selectedCacheItemData}
                  cacheKey={selectedCacheKey}
                  JsonViewer={ReactJson}
                  toolbarPosition={toolbarPosition}
                />
              </Keys>
            </div>
          </div>
        )}
      </Panel>
    </>
  );
}

export default SWRDevtoolsInternal;
