import { useState, useRef, useCallback } from "react";

type FuncType = (...args: any[]) => any;

export const useThrottle = <T extends FuncType>(func: T, ms: number) => {
  const [isThrottled, setIsThrottled] = useState(false);
  const savedArgs = useRef<any[]>();
  const savedThis = useRef<any>();

  const wrapper = useCallback(
    (...args: any[]) => {
      if (isThrottled) {
        savedArgs.current = args;
        savedThis.current = this;
        return;
      }

      func.apply(this, args);

      setIsThrottled(true);

      setTimeout(() => {
        setIsThrottled(false);
        if (savedArgs.current) {
          wrapper.apply(savedThis.current, savedArgs.current);
          savedArgs.current = savedThis.current;
        }
      }, ms);
    },
    [func, isThrottled, ms]
  );

  return wrapper as T;
};