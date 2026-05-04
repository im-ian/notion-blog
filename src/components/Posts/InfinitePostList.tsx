"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";

interface InfinitePostListProps {
  items: ReactNode[];
  pageSize: number;
}

const STORAGE_PREFIX = "infinitePostList:";

type StoredState = {
  count: number;
  scroll: number;
};

function readStored(key: string): StoredState | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredState>;
    if (
      typeof parsed.count !== "number" ||
      typeof parsed.scroll !== "number" ||
      Number.isNaN(parsed.count) ||
      Number.isNaN(parsed.scroll)
    ) {
      return null;
    }
    return { count: parsed.count, scroll: parsed.scroll };
  } catch {
    return null;
  }
}

function writeStored(key: string, state: StoredState): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(state));
  } catch {
    // sessionStorage 사용 불가 환경 무시
  }
}

export function InfinitePostList({ items, pageSize }: InfinitePostListProps) {
  const pathname = usePathname();
  const storageKey = `${STORAGE_PREFIX}${pathname}`;

  const safePageSize = Math.max(1, pageSize);
  const initialCount = Math.min(safePageSize, items.length);
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [pendingScroll, setPendingScroll] = useState<number | null>(null);
  const restoredRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // 마운트 시 1회 복원
  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;

    const stored = readStored(storageKey);
    if (!stored) return;

    const restoredCount = Math.min(items.length, Math.max(initialCount, stored.count));
    if (restoredCount > initialCount) {
      setVisibleCount(restoredCount);
    }
    if (stored.scroll > 0) {
      setPendingScroll(stored.scroll);
    }
  }, [storageKey, items.length, initialCount]);

  // visibleCount가 복원값에 도달한 뒤 paint된 다음 scrollTo
  useEffect(() => {
    if (pendingScroll === null) return;
    const targetY = pendingScroll;
    const id = requestAnimationFrame(() => {
      window.scrollTo({ top: targetY, behavior: "auto" });
      setPendingScroll(null);
    });
    return () => cancelAnimationFrame(id);
  }, [pendingScroll, visibleCount]);

  // 상태 + 스크롤 위치 저장 (변경마다 + 페이지 이탈 시)
  useEffect(() => {
    const save = () => {
      writeStored(storageKey, {
        count: visibleCount,
        scroll: window.scrollY,
      });
    };
    save();
    window.addEventListener("pagehide", save);
    return () => {
      save();
      window.removeEventListener("pagehide", save);
    };
  }, [storageKey, visibleCount]);

  // items가 줄어든 경우 clamp
  useEffect(() => {
    setVisibleCount((current) => Math.min(current, items.length));
  }, [items.length]);

  // 더 보이게 하기 위한 IntersectionObserver
  useEffect(() => {
    if (visibleCount >= items.length) return;
    const target = sentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisibleCount((current) =>
              Math.min(items.length, current + safePageSize),
            );
          }
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [visibleCount, items.length, safePageSize]);

  return (
    <>
      {items.slice(0, visibleCount)}
      {visibleCount < items.length && (
        <div ref={sentinelRef} aria-hidden={"true"} />
      )}
    </>
  );
}
