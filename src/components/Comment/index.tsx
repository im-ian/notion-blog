"use client";

import { useEffect, useRef, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";

import { vars } from "@/css/vars.css";
import { useTheme } from "@/hooks/useTheme";
import { getSiteConfig } from "@/utils/config";

function Comment() {
  const commentRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { repo } = getSiteConfig("profile");
    if (!repo) return;

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.setAttribute("repo", repo);
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("label", "comment");
    script.setAttribute("theme", "preferred-color-scheme");
    script.setAttribute("crossorigin", "anonymous");
    script.onload = () => setIsLoading(false);

    commentRef.current?.appendChild(script);
  }, []);

  useEffect(() => {
    if (!theme) return;

    const $comment = document.getElementsByClassName(
      "utterances-frame",
    )[0] as HTMLIFrameElement;

    $comment?.contentWindow?.postMessage(
      {
        type: "set-theme",
        theme: theme === "dark" ? "github-dark" : "github-light",
      },
      "https://utteranc.es",
    );
  }, [theme]);

  return (
    <div ref={commentRef}>
      {isLoading && (
        <BounceLoader
          cssOverride={{ margin: vars.space.center }}
          color={vars.color["brand-400"]}
        />
      )}
    </div>
  );
}

export default Comment;
