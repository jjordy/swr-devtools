import { SWRConfig, useSWRConfig } from "swr";
import SWRDevtools, { Cache } from "../components";

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{provider: () => new Cache() }}>
      <Component {...pageProps} />
      <SWRDevtools />
    </SWRConfig>
  );
}
