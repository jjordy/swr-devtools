import React from 'react';
import { SWRDevtoolsProps } from './SWRDevtools/types'

export function SWRDevtools ({ children, cache, ...rest }: SWRDevtoolsProps) {
  if (process.env.NODE_ENV === "development") {
    const Devtools = require("./SWRDevtools").default;
    return <Devtools cache={cache} {...rest}>{children}</Devtools>;
  }
  return <>{children}</>
}

export default SWRDevtools
