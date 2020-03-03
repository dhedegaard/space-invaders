import React from "react";

export const useIsKeyPressed = () => {
  const keyspressedRef = React.useRef<Set<string>>(new Set());

  const keydownHandler = React.useCallback(
    (event: KeyboardEvent) => {
      keyspressedRef.current.add(event.key);
    },
    [keyspressedRef]
  );
  const keyupHandler = React.useCallback(
    (event: KeyboardEvent) => {
      keyspressedRef.current.delete(event.key);
    },
    [keyspressedRef]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    document.addEventListener("keyup", keyupHandler);
    return () => {
      document.removeEventListener("keydown", keydownHandler);
      document.removeEventListener("keyup", keyupHandler);
    };
  }, [keydownHandler, keyupHandler]);

  const isKeyPressed = React.useCallback(
    (key: string): boolean => keyspressedRef.current.has(key),
    [keyspressedRef]
  );

  return isKeyPressed;
};
