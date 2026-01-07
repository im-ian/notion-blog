"use client";

import { useEffect, useState } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    function handleMediaQueryChange() {
      setMatches(mediaQuery.matches);
    }

    handleMediaQueryChange();

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () =>
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, [query]);

  return matches;
}

export default useMediaQuery;
