import React from 'react';

export default function SWRDevtools ({ children, cache,...rest }) {
  if (process.env.NODE_ENV === "development") {
    const Devtools = require("./SWRDevtools").default;
    return <Devtools cache={cache} {...rest}>{children}</Devtools>;
  }
  return <>{children}</>
}
