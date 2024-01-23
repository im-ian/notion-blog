import { useState, useEffect } from "react";

function getMediaQueryMatches(query: string) {
  const matches = window.matchMedia(query).matches;
  return matches;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(getMediaQueryMatches(query));

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    function handleMediaQueryChange() {
      setMatches(mediaQuery.matches);
    }

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () =>
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, [query]);

  return matches;
}

export default useMediaQuery;
