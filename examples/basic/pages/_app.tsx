import { SWRConfig, useSWRConfig } from "swr";
import SWRDevtools from "@jjordy/swr-devtools";

export default function App({ Component, pageProps }) {
  const { cache, mutate } = useSWRConfig();
  console.log(cache);
  return (
    <>
      <SWRConfig value={{provider: () => new Map() }}>
        <Component {...pageProps} />
        <SWRDevtools cache={cache} mutate={mutate} />
      </SWRConfig>
    </>
  );
}
