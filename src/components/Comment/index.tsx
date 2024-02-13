"use client";

import { useEffect, useRef, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";

import { Box } from "../Layouts";

import { vars } from "@/css/vars.css";
import useDarkMode from "@/hooks/useDarkMode";
import { getSiteConfig } from "@/utils/config";

function Comment() {
  const commentRef = useRef<HTMLDivElement>(null);

  const isDarkMode = useDarkMode();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isDarkMode === undefined) return;

    setIsLoading(true);

    const [$utterances] = document.getElementsByClassName("utterances");
    const [$comment] = document.getElementsByClassName("utterances-frame");
    if ($comment) $utterances.remove();

    const { repo } = getSiteConfig("profile");
    if (!repo) return;

    const theme = isDarkMode ? "github-dark" : "github-light";

    const script = document.createElement("script");
    script.id = "utterances";
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.setAttribute("repo", repo);
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("label", "comment");
    script.setAttribute("theme", theme);
    script.setAttribute("crossorigin", "anonymous");
    script.onload = () => setIsLoading(false);

    commentRef.current?.appendChild(script);
  }, [isDarkMode]);

  return (
    <div ref={commentRef}>
      {isLoading && (
        <BounceLoader
          cssOverride={{ margin: vars.space["center"] }}
          color={vars.color["brand-400"]}
        />
      )}
    </div>
  );
}

export default Comment;
