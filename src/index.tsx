import React from 'react';

export default function SWRDevtools ({ children, ...rest }) {
  if (process.env.NODE_ENV === "development") {
    const Devtools = require("./SWRDevtools").default;
    return <Devtools {...rest}>{children}</Devtools>;
  }
  return <>{children}</>
}
