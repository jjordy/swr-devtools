import React, { useState, useEffect, useRef } from "react";
import Data from "./Data";
import Keys from "./Keys";
import Panel from "./Panel";
import { ToolbarPositions, SWRDevtoolsProps } from "./types";
import { usePrevious } from "./hooks";

function filterErrors(keys: string[]) {
  let errs = [];
  try {
    for (const item of keys) {
      if (!item.includes("$err$")) {
        errs.push(item);
      }
    }
  } catch (err) {
  } finally {
    return errs;
  }
}

function filterValidating(keys: string[]) {
  let errs = [];
  try {
    for (const item of keys) {
      if (!item.includes("$req$")) {
        errs.push(item);
      }
    }
  } catch (err) {
  } finally {
    return errs;
  }
}

const DefaultOpenComponent = (
  <span
    aria-label="Open Devtools"
    style={{
      fontSize: 16,
      boxSizing: "border-box",
      borderTopRightRadius: "3px",
      borderTopLeftRadius: "3px",
      backgroundImage: "linear-gradient(90deg,#0f2027,#203a43,#2c5364)",
      fontWeight: "bolder",
      color: "#fff",
    }}
  >
    <span style={{ padding: "1rem", fontSize: 12 }}>SWR DEVTOOLS</span>
  </span>
);

export function SWRDevtools({
  debug = false,
  position = "right",
  cache,
  mutate,
  CustomOpenComponent,
  openBtnPosition = "left",
  defaultOpen = false,
}: SWRDevtoolsProps) {
  const [show, toggleShow] = useState(false);
  //@ts-ignore
  const ReactJson = useRef((props: any) => <></>);
  const [toolbarPosition, setToolbarPosition] = useState<ToolbarPositions>(
    position
  );
  const prevPosition = usePrevious(toolbarPosition);
  const [cacheKeys, setCacheKeys] = useState(
    filterValidating(filterErrors(cache.keys()))
  );

  const [selectedCacheItemData, setSelectedCacheItemData] = useState(null);
  const [selectedCacheKey, setSelectedCacheKey] = useState<string | null>(null);
  const handleToggleShow = () => toggleShow(!show);

  useEffect(() => toggleShow(defaultOpen), [defaultOpen]);

  useEffect(() => {
    setCacheKeys(filterValidating(filterErrors(cache.keys())));
  }, [cache]);

  const handleSelectedCacheItem = (key: string) => {
    setSelectedCacheKey(key);
    setSelectedCacheItemData(cache.get(key));
  };

  const clearCacheByKey = (key: string) => {
    cache.set(key, null);
  };

  const revalidate = (key: string) => {
    mutate(cache, key);
  };
  return (
    <>
      {!show && (
        <div
          style={{
            position: "fixed",
            boxSizing: "border-box",
            boxShadow: "2px 2px 2px #222",
            bottom: 0,
            left: openBtnPosition === "left" ? 150 : null,
            right: openBtnPosition === "right" ? 150 : null,
            zIndex: 999999,
            backgroundColor: "#222",
            borderRadius: 6,
          }}
        >
          <button
            title="Open SWR Devtools"
            onClick={handleToggleShow}
            style={{
              border: 0,
              backgroundColor: "transparent",
              boxSizing: "border-box",
              borderRadius: 6,
              padding: 0,
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
                keys={cacheKeys}
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

export default SWRDevtools;
