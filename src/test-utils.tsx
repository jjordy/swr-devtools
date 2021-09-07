import React from "react";
import { render } from "@testing-library/react";

const WrapperForTests = ({ children }) => {
  return <div>{children}</div>;
};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: WrapperForTests, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
