import { useCallback, useEffect, useState } from "react";
import { throttle, useStore } from "../hooks";

export default function useKeysState() {
  const { get, set, ready } = useStore({ store: "SWRDevtools" });
  const [state, setState] = useState({ width: 325, height: 400 });
  useEffect(() => {
    get("keys_width").then((width) => {
      if (width) setState({ ...state, width });
    });
    get("keys_height").then((height) => {
      if (height) setState({ ...state, height });
    });
    return () => {
      set("keys_width", state.width);
      set("keys_height", state.height);
    };
  }, [ready]);
  const handle = throttle((width, position) => {
    setState({
      height: 400,
      width,
      ...position,
    });
  }, 25);
  const handleResize = useCallback(
    async (e, direction, ref, delta, position) => {
      handle(parseInt(ref.style.width, 10), position);
    },
    [set, setState]
  );
  return {
    handleResize,
    state,
  };
}
