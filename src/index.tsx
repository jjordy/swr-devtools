import React from "react";
import { SWRDevtoolsProps } from "./SWRDevtools/types";
import { SWRConfig, useSWRConfig, Middleware, Cache } from "swr";
import { injectSWRCache, isMetaCache } from "./SWRDevtools/Cache";

const injected = new WeakSet();

const inject = (c: Cache) =>
  injectSWRCache(c, (key: string, value: any) => {
    if (isMetaCache(key)) {
      return;
    }
    if (typeof "window" !== undefined) {
      window.postMessage({ key, value }, "*");
    }
  });

const devtools: Middleware = (useSWRNext) => (key, fn, config) => {
  const { cache } = useSWRConfig();
  if (!injected.has(cache)) {
    inject(cache);
    injected.add(cache);
  }
  const swr = useSWRNext(key, fn, config);
  return swr;
};

export function SWRDevtools({ children, ...rest }: SWRDevtoolsProps) {
  if (process.env.NODE_ENV === "development") {
    const Devtools = require("./SWRDevtools").default;
    return (
      <SWRConfig value={{ use: [devtools] }}>
        {children}
        <Devtools {...rest} />
      </SWRConfig>
    );
  }
  return <>{children}</>;
}

export default SWRDevtools;
