"use client";

import { useState, useEffect } from "react";

import { vars } from "@/css/vars.css";
import { throttle } from "@/utils/throttle";

function ScrollProgressBar() {
  const [scroll, setScroll] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const onScroll = throttle(() => {
      const scroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setScroll(scroll);
      setHeight(height);
    }, 10);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const progress = (scroll / height) * 100;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: 2,
        background: vars.color["brand-400"],
        zIndex: 1,
      }}
    />
  );
}

export default ScrollProgressBar;
