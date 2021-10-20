import { useCallback, useState } from "react";
import { throttle } from "../hooks";

export default function useKeysState() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState({ width: 325, height: 400 });
  const handle = throttle((width, position) => {
    setState({
      height: 400,
      width,
      ...position,
    });
  }, 25);
  const handleResize = useCallback(
    //@ts-ignore
    async (e, direction, ref, delta, position) => {
      handle(parseInt(ref.style.width, 10), position);
    },
    [setState]
  );

  const handleSetQuery = useCallback(
    (evt) => {
      setQuery(evt.target.value);
    },
    [setQuery]
  );

  const handleClearQuery = useCallback(() => {
    setQuery("");
  }, [setQuery])
  return {
    handleResize,
    state,
    query,
    handleSetQuery,
    handleClearQuery,
  };
}
