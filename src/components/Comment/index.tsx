"use client";

import { useEffect, useRef } from "react";

import useDarkMode from "@/hooks/useDarkMode";
import { getSiteConfig } from "@/utils/config";

function Comment() {
  const commentRef = useRef<HTMLDivElement>(null);

  const isDarkMode = useDarkMode();

  useEffect(() => {
    if (isDarkMode === undefined) return;

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

    commentRef.current?.appendChild(script);
  }, [isDarkMode]);

  return <div ref={commentRef}></div>;
}

export default Comment;
