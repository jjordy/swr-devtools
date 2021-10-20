import React, { useCallback, useState } from "react";

export const DevToolsContext = React.createContext({
  data: {},
  add: (_key: string, _value: any) => {},
});

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState({});
  const add = useCallback(
    (key: string, value: any) => {
      setData({ ...data, [key]: value });
    },
    [data, setData]
  );
  return (
    <DevToolsContext.Provider
      value={{
        data,
        add,
      }}
    >
      {children}
    </DevToolsContext.Provider>
  );
};
