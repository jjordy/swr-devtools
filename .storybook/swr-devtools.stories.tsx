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

const Posts = () => {
  const { data } = useSWR(
    `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=10`,
    fetcher
  );
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-extrabold text-blue-500">Posts</h1>
      <hr />
      <div className="flex flex-wrap mt-2">
        {data &&
          data.map(item => (
            <div key={item.id} className="w-1/2  mb-2">
              <div className="p-4 mr-2 shadow-xl border h-full rounded-lg">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export const defaultSetup = () => {
  return (
    <div>
      <SWRDevtools cache={cache} mutate={mutate}>
        <Posts />
      </SWRDevtools>
    </div>
  );
};

const CustomOpenIcon = () => {
  return (
    <div className="px-3 py-2 shadow border rounded bg-blue-500 hover:bg-blue-800 text-white font-extrabold">
      OPEN DEVTOOLS CUSTOM
    </div>
  )
}

export const customOpenIcon = () => {
  return <SWRDevtools cache={cache} mutate={mutate} CustomOpenComponent={<CustomOpenIcon />}>
    <Posts />
  </SWRDevtools>;
}

export const customDefaultPosition = () => {
  return (
    <SWRDevtools
      cache={cache}
      mutate={mutate}
      position="bottom"
    >
      <Posts />
    </SWRDevtools>
  );
}

export const customButtonPosition = () => {
    return (
      <SWRDevtools cache={cache} mutate={mutate} openBtnPosition="right">
        <Posts />
      </SWRDevtools>
    );
}

export const defaultOpen = () => {
  return (
    <SWRDevtools cache={cache} mutate={mutate} defaultOpen debug>
      <Posts />
    </SWRDevtools>
  );
}