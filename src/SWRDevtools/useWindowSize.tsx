import React from "react";

const events = new Set<() => void>();
const onResize = () => events.forEach(fn => fn());

const useWindowSize = (options: { throttleMs?: number } = {}) => {
  const { throttleMs = 100 } = options;
  const [size, setSize] = React.useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0
  });

  const handle = throttle(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, throttleMs);

  React.useEffect(() => {
    if (events.size === 0) {
      window.addEventListener("resize", onResize, true);
    }

    events.add(handle);

    return () => {
      events.delete(handle);

      if (events.size === 0) {
        window.removeEventListener("resize", onResize, true);
      }
    };
  }, []);

  return size;
};

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  threshold: number = 250,
  scope?: any
): T {
  let last: number, deferTimer: any;
  return function(this: any) {
    let context = scope || this;

    let now = Date.now(),
      args = arguments;
    if (last && now < last + threshold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function() {
        last = now;
        func.apply(context, args as any);
      }, threshold);
    } else {
      last = now;
      func.apply(context, args as any);
    }
  } as T;
}

export default useWindowSize;
