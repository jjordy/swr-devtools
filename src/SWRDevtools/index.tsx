import React, { useState, useEffect, useCallback } from "react";
import { cache, mutate } from "swr";
import Data from "./Data";
import Keys from "./Keys";
import ToolsPanel from "./ToolsPanel";

function filterErrors(keys: string[]) {
  return keys.filter(key => !key.includes("err@"));
}

type ToolbarPositions = "right" | "left" | "bottom";

export default function SWRDevtools({ children, debug = false }: any) {
  const [show, toggleShow] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState<ToolbarPositions>("right");
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
            left: 0,
            zIndex: 9999
          }}
        >
          <div style={{ paddingRight: "1rem", paddingBottom: "1rem" }}>
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
              <span
                role="img"
                aria-label="Open Devtools"
                style={{
                  fontSize: 32
                }}
              >
                👨‍💻
              </span>
            </button>
          </div>
        </div>
      )}
      <ToolsPanel
        show={show}
        debug={debug}
        toolbarPosition={toolbarPosition}
        setToolbarPosition={setToolbarPosition}
        toggleShow={handleToggleShow}
      >
        {({ isDragging }) => (
          <div style={{ display: "flex" }}>
            <div style={{ width: "40%" }}>
              <Keys
                keys={cacheKeys}
                selectedKey={selectedCacheKey}
                onSelect={handleSelectedCacheItem}
                onClear={clearCacheByKey}
                onRevalidate={revalidate}
              />
            </div>
            <div style={{ width: "60%" }}>
              <Data
                data={!isDragging ? selectedCacheItemData : {}}
                cacheKey={selectedCacheKey}
                toolbarPosition={toolbarPosition}
              />
            </div>
          </div>
        )}
      </ToolsPanel>
      <div>{children}</div>
    </>
  );
}
