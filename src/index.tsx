import React from 'react';
import { SWRDevtoolsProps } from './SWRDevtools/types'

export function SWRDevtools ({ cache, mutate, ...rest }: SWRDevtoolsProps) {
  if (process.env.NODE_ENV === "development") {
    const Devtools = require("./SWRDevtools").default;
    return <Devtools cache={cache} mutate={mutate} {...rest} />;
  }
  return <></>
}

export default SWRDevtools
