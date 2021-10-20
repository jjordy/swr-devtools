import React from "react";
import { Rnd } from "react-rnd";
import themes from "../themes";
import { KeysProps } from "../types";
import useKeysState from "./useKeysState";
import KeyItem from "./KeyItem";
import CloseIcon from "../Icons/CloseIcon";

export default function Keys({
  keys,
  selectedKey,
  onSelect,
  onClear,
  onRevalidate,
  theme,
  panelWidth,
  children = <></>,
}: KeysProps) {
  const {
    handleResize,
    query,
    handleSetQuery,
    handleClearQuery,
    state: { width, height },
  } = useKeysState();
  return (
    <>
      <Rnd size={{ width, height }} enableResizing={{ right: true }} onResize={handleResize}>
        <div
          style={{
            flex: 1,
            textOverflow: "ellipsis",
            overflow: "scroll",
            position: "relative",
            minHeight: 400,
            height: "100%",
            ...themes[theme].keys,
          }}
        >
          <div
            style={{
              width: "100%",
              boxSizing: "border-box",
              paddingLeft: "0.25rem",
              fontSize: 14,
              fontWeight: 900,
              textOverflow: "ellipsis",
              display: "flex",
            }}
          >
            <input
              type="text"
              value={query}
              onChange={handleSetQuery}
              style={{
                height: 30,
                background: "transparent",
                width: "90%",
                paddingLeft: "0.5rem",
              }}
              placeholder="Search keys..."
              aria-label="Search Keys"
            />
            <button
              onClick={handleClearQuery}
              title="Clear Search Query"
              style={{
                backgroundColor: "rebeccapurple",
                color: "#fff",
                width: "10%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CloseIcon height={8} width={8} />
            </button>
          </div>
          {!query &&
            keys.map((cacheKey: string) => (
              <KeyItem
                key={cacheKey}
                cacheKey={cacheKey}
                selectedKey={selectedKey}
                onClear={onClear}
                onRevalidate={onRevalidate}
                onSelect={onSelect}
              />
            ))}
          {query &&
            keys
              .filter((k) => k.includes(query))
              .map((cacheKey: string) => (
                <KeyItem
                  key={cacheKey}
                  cacheKey={cacheKey}
                  selectedKey={selectedKey}
                  onClear={onClear}
                  onRevalidate={onRevalidate}
                  onSelect={onSelect}
                />
              ))}
        </div>
      </Rnd>
      <div
        style={{ marginLeft: width, height: height, width: `calc(${panelWidth}px - ${width}px)` }}
      >
        {children}
      </div>
    </>
  );
}
