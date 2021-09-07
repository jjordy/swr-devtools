import React from 'react';
import { SWRConfig } from 'swr';
import SWRDevtools from ".";
import { Cache } from '..';
import { describe, test, expect } from "@jest/globals";
import { render, screen } from "../test-utils";

describe('SWR Devtools', () => {
 test("Should render a component", async () => {
   expect.assertions(1);
    render(
      <SWRConfig value={{ provider: () => new Cache() }}>
        <SWRDevtools />
      </SWRConfig>
    );
    const title = await screen.getByTitle("Open SWR Devtools");
    //@ts-ignore
    expect(title).toHaveTextContent("SWR DEVTOOLS")
 }); 
})