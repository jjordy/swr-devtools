import React from 'react';
import { SWRDevtoolsProps } from './SWRDevtools/types'
import CacheProvider from "./SWRDevtools/Cache";

export function SWRDevtools ({  ...rest }: SWRDevtoolsProps) {
  if (process.env.NODE_ENV === "development") {
    const Devtools = require("./SWRDevtools").default;
    return <Devtools {...rest} />;
  }
  return <></>
}

export const Cache = CacheProvider;

export default SWRDevtools
