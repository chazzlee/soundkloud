import { useEffect } from "react";

export function useEscape(onAction) {
  useEffect(() => {
    const closeOnEsc = (e) => {
      if (e.key === "Escape") {
        onAction();
      }
    };

    window.addEventListener("keydown", closeOnEsc);

    return () => {
      window.removeEventListener("keydown", closeOnEsc);
    };
  }, [onAction]);
}
