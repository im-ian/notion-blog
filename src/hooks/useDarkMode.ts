import useMediaQuery from "./useMediaQuery";

function useDarkMode() {
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return darkMode;
}

export default useDarkMode;
