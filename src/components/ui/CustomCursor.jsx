import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const interactiveSelector = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  '[role="button"]',
  '[data-cursor="interactive"]',
].join(",");

const textSelector = '[data-cursor="text"]';

function useTrailDot(mouseX, mouseY, springConfig) {
  return {
    x: useSpring(mouseX, springConfig),
    y: useSpring(mouseY, springConfig),
  };
}

function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );
  const [cursorType, setCursorType] = useState("default");
  const [hasMoved, setHasMoved] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, {
    stiffness: 520,
    damping: 34,
    mass: 0.32,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 520,
    damping: 34,
    mass: 0.32,
  });

  const trailDotOne = useTrailDot(mouseX, mouseY, {
    stiffness: 260,
    damping: 28,
    mass: 0.45,
  });

  const trailDotTwo = useTrailDot(mouseX, mouseY, {
    stiffness: 210,
    damping: 30,
    mass: 0.55,
  });

  const trailDotThree = useTrailDot(mouseX, mouseY, {
    stiffness: 170,
    damping: 32,
    mass: 0.65,
  });

  const trailDotFour = useTrailDot(mouseX, mouseY, {
    stiffness: 135,
    damping: 34,
    mass: 0.75,
  });

  const trailDots = [
    { motion: trailDotOne, size: 6, opacity: 0.34 },
    { motion: trailDotTwo, size: 5, opacity: 0.26 },
    { motion: trailDotThree, size: 4, opacity: 0.2 },
    { motion: trailDotFour, size: 3, opacity: 0.16 },
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateCursorMode = () => {
      const shouldEnable = mediaQuery.matches;

      setIsEnabled(shouldEnable);

      if (!shouldEnable) {
        setCursorType("default");
        setHasMoved(false);
        setIsPressed(false);
      }
    };

    mediaQuery.addEventListener("change", updateCursorMode);

    return () => {
      mediaQuery.removeEventListener("change", updateCursorMode);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("custom-cursor-active", isEnabled);

    return () => {
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled) {
      return undefined;
    }

    const handleMouseMove = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setHasMoved(true);

      const hoveredElement =
        event.target instanceof Element ? event.target : null;
      const interactiveTarget = hoveredElement?.closest(interactiveSelector);

      if (interactiveTarget) {
        setCursorType("interactive");
        return;
      }

      const textTarget = hoveredElement?.closest(textSelector);

      if (textTarget) {
        setCursorType("text");
        return;
      }

      setCursorType("default");
    };

    const handleMouseOut = (event) => {
      if (!event.relatedTarget) {
        setHasMoved(false);
        setCursorType("default");
        setIsPressed(false);
      }
    };

    const handleMouseDown = () => {
      setIsPressed(true);
    };

    const releaseCursor = () => {
      setIsPressed(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", releaseCursor);
    window.addEventListener("blur", releaseCursor);
    document.documentElement.addEventListener("mouseleave", releaseCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", releaseCursor);
      window.removeEventListener("blur", releaseCursor);
      document.documentElement.removeEventListener("mouseleave", releaseCursor);
    };
  }, [isEnabled, mouseX, mouseY]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      {trailDots.map((dot) => (
        <motion.div
          aria-hidden="true"
          className="custom-cursor custom-cursor-trail pointer-events-none fixed rounded-full"
          key={dot.size}
          style={{
            left: dot.motion.x,
            top: dot.motion.y,
            x: "-50%",
            y: "-50%",
            width: dot.size,
            height: dot.size,
            transformOrigin: "center",
          }}
          initial={false}
          animate={{
            opacity:
              hasMoved && cursorType === "default"
                ? dot.opacity
                : dot.opacity * 0.5,
          }}
          transition={{ opacity: { duration: 0.18 } }}
        />
      ))}

      <motion.div
        aria-hidden="true"
        className="custom-cursor pointer-events-none fixed rounded-full"
        style={{
          left: smoothX,
          top: smoothY,
          x: "-50%",
          y: "-50%",
          transformOrigin: "center",
        }}
        initial={false}
        animate={{
          scale: isPressed ? 0.9 : 1,
          width:
            cursorType === "interactive" ? 35 : cursorType === "text" ? 3 : 12,
          height:
            cursorType === "interactive" ? 35 : cursorType === "text" ? 45 : 12,
          borderRadius: cursorType === "text" ? 999 : 999,
          opacity: hasMoved ? 1 : 0,
          backgroundColor: isPressed
            ? "rgba(34, 211, 238, 0.88)"
            : cursorType === "interactive"
              ? "rgba(34, 211, 238, 0.08)"
              : "rgba(34, 187, 238, 0.95)",
          borderColor: isPressed
            ? "rgba(226, 246, 255, 0.78)"
            : cursorType === "interactive"
              ? "rgba(125, 211, 252, 0.72)"
              : "rgba(125, 211, 252, 0)",
          boxShadow: isPressed
            ? "0 0 20px rgba(34, 211, 238, 0.72), 0 0 42px rgba(14, 165, 233, 0.34)"
            : cursorType === "interactive"
              ? "0 0 18px rgba(34, 211, 238, 0.42), 0 0 34px rgba(14, 165, 233, 0.22)"
              : cursorType === "text"
                ? "0 0 14px rgba(34, 211, 238, 0.58), 0 0 26px rgba(226, 246, 255, 0.18)"
                : "0 0 14px rgba(34, 211, 238, 0.62), 0 0 24px rgba(14, 165, 233, 0.26)",
        }}
        transition={{
          scale: { duration: 0.14, ease: "easeOut" },
          width: { duration: 0.18 },
          height: { duration: 0.18 },
          borderRadius: { duration: 0.18 },
          opacity: { duration: 0.14 },
          backgroundColor: { duration: 0.18 },
          borderColor: { duration: 0.18 },
          boxShadow: { duration: 0.18 },
        }}
      />
    </>
  );
}

export default CustomCursor;
