import { useSWRConfig } from "swr";
import SWRDevtools from "@jjordy/swr-devtools";

export default function App({ Component, pageProps }) {
  const { cache, mutate } = useSWRConfig();
  console.log(cache);
  return (
    <>
      <Component {...pageProps} />
      <SWRDevtools cache={cache} mutate={mutate} />
    </>
  );
}
