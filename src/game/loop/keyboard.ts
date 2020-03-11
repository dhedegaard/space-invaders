import React from "react";

export const useIsKeyPressed = () => {
  const keyspressedRef = React.useRef<Set<string>>(new Set());

  React.useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) =>
      keyspressedRef.current.add(event.key);
    const keyupHandler = (event: KeyboardEvent) =>
      keyspressedRef.current.delete(event.key);

    document.addEventListener("keydown", keydownHandler);
    document.addEventListener("keyup", keyupHandler);
    return () => {
      document.removeEventListener("keydown", keydownHandler);
      document.removeEventListener("keyup", keyupHandler);
    };
  }, []);

  const isKeyPressed = React.useCallback(
    (key: string): boolean => keyspressedRef.current.has(key),
    [keyspressedRef]
  );

  return isKeyPressed;
};
