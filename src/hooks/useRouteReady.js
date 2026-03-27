"use client";

/**
 * 🔥 useRouteReady
 * Ensures UI re-renders correctly on route change
 * Fixes: back navigation blank / stuck loading issue
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function useRouteReady() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Reset on route change
    setReady(false);

    // Small delay to allow hydration + state sync
    const timeout = setTimeout(() => {
      setReady(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return ready;
}