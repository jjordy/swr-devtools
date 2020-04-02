import React from "react";
import SWRDevtools from "../src/index";
import useSWR, { cache, mutate } from "swr";
import { withInfo } from "@storybook/addon-info";

export default {
  title: "SWR Devtools",
  decorators: [withInfo],
  parameters: { info: { inline: true } }
};

function fetcher(url) {
  return fetch(url)
    .then(res => res)
    .then(res => res.json());
}

interface Color {
  id: number
  name: string
  year: number
  color: string;
  pantone_value: string;
}

interface ApiResponse {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: Color[]
}

const Colors = () => {
  const { data, error } = useSWR<ApiResponse>(
    `https://reqres.in/api/unknown`,
    fetcher
  );
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-extrabold text-blue-500">Colors</h1>
      <hr />
      {error && (
        <div className="bg-red-500 text-white font-bold text-xl text-center rounded shadow">
          <h1>Error Fetching Colors 😢</h1>
          <pre>
            <code>{JSON.stringify(error, null, 2)}</code>
          </pre>
        </div>
      )}
      <div className="flex flex-wrap mt-2">
        {data &&
          data.data.map(item => (
            <div key={item.id} className="w-1/2  mb-2">
              <div className="p-4 mr-2 shadow-xl border h-full rounded-lg" style={{backgroundColor: item.color}}>
                <h3 className="text-4xl uppercase text-center font-bold text-white">{item.name}</h3>
                <p className="text-xl uppercase text-center font-bold text-white">{item.color}</p>
              </div>
            </div>
          ))}
      </div>
      {!data && !error && <div>Loading...</div>}
    </div>
  );
};

export const defaultSetup = () => {
  return (
    <div>
      <SWRDevtools cache={cache} mutate={mutate} />
      <Colors />
    </div>
  );
};

const CustomOpenIcon = () => {
  return (
    <div className="px-3 py-2 shadow border rounded bg-blue-500 hover:bg-blue-800 text-white font-extrabold">
      OPEN DEVTOOLS CUSTOM
    </div>
  );
};

export const customOpenIcon = () => {
  return (
    <div>
      <SWRDevtools
        cache={cache}
        mutate={mutate}
        CustomOpenComponent={<CustomOpenIcon />}
      />
      <Colors />
    </div>
  );
};

export const customDefaultPosition = () => {
  return (
    <div>
      <SWRDevtools cache={cache} mutate={mutate} position="bottom" />
      <Colors />
    </div>
  );
};

export const customButtonPosition = () => {
  return (
    <div>
      <SWRDevtools cache={cache} mutate={mutate} openBtnPosition="right" />
      <Colors />
    </div>
  );
};

export const defaultOpen = () => {
  return (
    <div>
      <SWRDevtools cache={cache} mutate={mutate} defaultOpen debug />
      <Colors />
    </div>
  );
};
