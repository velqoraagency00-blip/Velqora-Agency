"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";

const ACTIVE_HTML_CLASS = "velqora-cursor-active";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [role="tab"], select, summary, input[type="checkbox"], input[type="radio"]';

const TEXT_INPUT_SELECTOR =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="range"]):not([type="color"]):not([type="file"]), textarea, [contenteditable="true"], [contenteditable=""]';

const TEXT_CONTENT_SELECTOR =
  "p, h1, h2, h3, h4, h5, h6, li, blockquote, code, pre";

function subscribeEligibility(callback: () => void): () => void {
  const finePointerMq = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

  finePointerMq.addEventListener("change", callback);
  reducedMotionMq.addEventListener("change", callback);

  return () => {
    finePointerMq.removeEventListener("change", callback);
    reducedMotionMq.removeEventListener("change", callback);
  };
}

function getEligibilitySnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getServerEligibilitySnapshot(): boolean {
  return false;
}

function isTextModeTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;

  if (target.closest(TEXT_INPUT_SELECTOR)) {
    return true;
  }

  // Never switch to text cursor when hovering inside interactive links or buttons.
  if (target.closest(INTERACTIVE_SELECTOR)) {
    return false;
  }

  const selection = window.getSelection();
  if (selection && !selection.isCollapsed) {
    return true;
  }

  return Boolean(target.closest(TEXT_CONTENT_SELECTOR));
}

export function CustomCursor() {
  const enabled = useSyncExternalStore(
    subscribeEligibility,
    getEligibilitySnapshot,
    getServerEligibilitySnapshot
  );
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove(ACTIVE_HTML_CLASS);
      return;
    }

    const el = cursorRef.current;
    if (!el) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let hasMoved = false;
    let rafId: number | null = null;

    const setHtmlCursorHidden = (hideSystemCursor: boolean) => {
      if (hideSystemCursor) {
        document.documentElement.classList.add(ACTIVE_HTML_CLASS);
      } else {
        document.documentElement.classList.remove(ACTIVE_HTML_CLASS);
      }
    };

    const applyTransform = () => {
      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) translate(-50%, -50%)`;
    };

    const step = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      if (Math.abs(dx) < 0.15 && Math.abs(dy) < 0.15) {
        currentX = targetX;
        currentY = targetY;
        applyTransform();
        rafId = null;
        return;
      }

      // Snappy follow without long lag or trailing blur.
      currentX += dx * 0.34;
      currentY += dy * 0.34;
      applyTransform();
      rafId = window.requestAnimationFrame(step);
    };

    const scheduleStep = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(step);
      }
    };

    const hideCursor = () => {
      el.dataset.visible = "false";
      el.dataset.hover = "false";
      el.dataset.text = "false";
      setHtmlCursorHidden(false);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        hideCursor();
        return;
      }

      targetX = event.clientX;
      targetY = event.clientY;

      if (!hasMoved) {
        hasMoved = true;
        currentX = targetX;
        currentY = targetY;
        applyTransform();
      }

      const textMode = isTextModeTarget(event.target);
      const isInteractive =
        !textMode &&
        event.target instanceof Element &&
        Boolean(event.target.closest(INTERACTIVE_SELECTOR));

      setHtmlCursorHidden(true);
      el.dataset.visible = textMode ? "false" : "true";
      el.dataset.text = textMode ? "true" : "false";
      el.dataset.hover = isInteractive ? "true" : "false";

      scheduleStep();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        hideCursor();
        return;
      }
      el.dataset.pressed = "true";
    };

    const onPointerUp = () => {
      el.dataset.pressed = "false";
    };

    const onTouchStart = () => {
      hideCursor();
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("blur", hideCursor);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("blur", hideCursor);
      setHtmlCursorHidden(false);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      data-visible="false"
      data-hover="false"
      data-pressed="false"
      data-text="false"
      className="velqora-custom-cursor"
    >
      <span className="velqora-custom-cursor-ring" />
      <span className="velqora-custom-cursor-dot" />
    </div>
  );
}
