import { useState, useEffect } from "react";

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

export const useIsMobile = (): boolean => {
  return useMediaQuery("(max-width: 767px)");
};

export const useIsDesktop = (): boolean => {
  return useMediaQuery("(min-width: 768px)");
};
