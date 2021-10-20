import React from "react";
import SWRDevtools from ".";
import { describe, test, expect } from "@jest/globals";
import { render, screen } from "../test-utils";

describe("SWR Devtools", () => {
  test("Should render a component", async () => {
    expect.assertions(1);
    render(<SWRDevtools>Hello WOrld</SWRDevtools>);
    const title = await screen.getByTitle("Open SWR Devtools");
    //@ts-ignore
    expect(title).toHaveTextContent("SWR DEVTOOLS");
  });
});
