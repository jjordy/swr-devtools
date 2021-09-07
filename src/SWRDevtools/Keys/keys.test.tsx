import React from "react";
import KeysComponent from ".";
import  { describe, test, expect } from "@jest/globals";
import { render, screen } from "../../test-utils";
import "fake-indexeddb/auto";

export interface KeysProps {
  keys: string[];
  selectedKey: string;
  onSelect: (key: string) => void;
  onClear: (key: string) => void;
  onRevalidate: (key: string) => void;
  theme: string;
  children?: React.ReactNode;
  panelWidth?: number;
}

const keys=['https://test.com/test/1', 'https://test.com/test/2']

describe("SWR Devtools", () => {
  test("Should render a component", async () => {
    expect.assertions(1);
    await render(
      <KeysComponent
        keys={keys}
        selectedKey={"https://test.com/test/1"}
        onSelect={() => {}}
        onClear={() => {}}
        onRevalidate={() => {}}
        theme={"Dark"}
      />
    );
    const title = await screen.getByText("Cache Keys");
    expect(title).toBe(title);
  });
});
