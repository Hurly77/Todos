import React from "react";

export function useMediaQuery(query: string, onChange?: (matches: boolean) => void) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    // Check if window is defined (for SSR)
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
      onChange?.(e.matches);
    };

    if (media.matches !== matches) setMatches(media.matches);
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", listener);
    }

    return () => {
      if (typeof media.removeEventListener === "function") {
        media.removeEventListener("change", listener);
      }
    };
  }, [matches, onChange, query]);

  return matches;
}

export function useSizes() {
  const sm = useMediaQuery("(max-width: 640px)");
  const md = useMediaQuery("(max-width: 768px)");
  const lg = useMediaQuery("(max-width: 1024px)");
  const xl = useMediaQuery("(max-width: 1280px)");
  const xxl = useMediaQuery("(max-width: 1536px)");

  return { sm, md, lg, xl, xxl };
}

export function useIsSmall(onChange?: (isSmall: boolean) => void) {
  const sm = useMediaQuery("(max-width: 640px)", onChange);
  return sm;
}
