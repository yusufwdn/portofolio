import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Drop-in replacements for next/link and next/navigation that keep the
// current locale on every href, so you never hand-write "/id/..." anywhere.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
