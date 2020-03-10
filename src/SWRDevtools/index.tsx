import React, { useState, useEffect, useCallback, useRef } from "react";
import Data from "./Data";
import Keys from "./Keys";
import Panel from "./Panel";
import { ToolbarPositions, SWRDevtoolsProps } from "./types";
import { usePrevious } from "./hooks";

function filterErrors(keys: string[]) {
  return keys.filter(key => !key.includes("err@"));
}

const DefaultOpenComponent = (
  <span
    role="img"
    aria-label="Open Devtools"
    style={{
      fontSize: 32
    }}
  >
    👨‍💻
  </span>
);

export function SWRDevtools({
  children,
  debug = false,
  cache,
  position = "right",
  mutate,
  CustomOpenComponent,
  openBtnPosition = "left",
  defaultOpen = false
}: SWRDevtoolsProps) {
  const [show, toggleShow] = useState(false);
  //@ts-ignore
  const ReactJson = useRef((props: any) => <></>);
  const [toolbarPosition, setToolbarPosition] = useState<ToolbarPositions>(
    position
  );
  const prevPosition = usePrevious(toolbarPosition);
  const [cacheKeys, setCacheKeys] = useState(filterErrors(cache.keys()));
  const [selectedCacheItemData, setSelectedCacheItemData] = useState(null);
  const [selectedCacheKey, setSelectedCacheKey] = useState<string | null>(null);
  const handleToggleShow = () => toggleShow(!show);

  const handleSetCacheKey = useCallback(() => {
    setCacheKeys(filterErrors(cache.keys()));
    if (selectedCacheKey) {
      setSelectedCacheItemData(cache.get(selectedCacheKey));
    }
  }, [selectedCacheKey]);

  useEffect(() => toggleShow(defaultOpen), [defaultOpen]);

  useEffect(() => cache.subscribe(handleSetCacheKey), [handleSetCacheKey]);

  const handleSelectedCacheItem = (key: string) => {
    setSelectedCacheKey(key);
    setSelectedCacheItemData(cache.get(key));
  };

  const clearCacheByKey = (key: string) => {
    cache.set(key, null);
  };

  const revalidate = (key: string) => {
    mutate(key);
  };
  return (
    <>
      {!show && (
        <div
          style={{
            position: "fixed",
            boxSizing: "border-box",
            bottom: 0,
            left: openBtnPosition === "left" ? 0 : null,
            right: openBtnPosition === "right" ? 0 : null,
            padding: "1rem",
            zIndex: 999999
          }}
        >
          <div>
            <button
              title="Open SWR Devtools"
              onClick={handleToggleShow}
              style={{
                border: 0,
                backgroundColor: "transparent",
                boxSizing: "border-box",
                padding: 0
              }}
            >
              {CustomOpenComponent || DefaultOpenComponent}
            </button>
          </div>
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
        {({ theme, size }) => (
          <div
            style={{
              display: "flex",
              flex: toolbarPosition === "bottom" ? "1 1 auto" : 0
            }}
          >
            <div style={{ width: "40%" }}>
              <Keys
                theme={theme}
                keys={cacheKeys}
                selectedKey={selectedCacheKey}
                onSelect={handleSelectedCacheItem}
                onClear={clearCacheByKey}
                onRevalidate={revalidate}
              />
            </div>
            <div style={{ width: "60%" }}>
              <Data
                theme={theme}
                size={size}
                data={selectedCacheItemData}
                cacheKey={selectedCacheKey}
                JsonViewer={ReactJson}
                toolbarPosition={toolbarPosition}
              />
            </div>
          </div>
        )}
      </Panel>
      <div>{children}</div>
    </>
  );
}

export default SWRDevtools;
