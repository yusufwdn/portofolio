"use client";

import { MotionConfig } from "motion/react";

/**
 * Motion's default is to animate no matter what the visitor's system says;
 * the `prefers-reduced-motion` rule in globals.css only reaches CSS
 * animations, not the ones Motion drives from JavaScript. "user" makes every
 * motion component below drop its transform and layout animations when the
 * visitor has asked for less movement (opacity fades are kept).
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
