"use client";

import React, { useState, useEffect } from "react";

/**
 * This component prevents React hydration mismatch errors (#418) by
 * deferring the rendering of client-side content until after the first mount.
 * On the server and during hydration, it renders a minimal placeholder.
 * After hydration completes, it renders the actual children.
 */
export default function HydrationFix({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return null during SSR and initial hydration to avoid mismatches
    return null;
  }

  return <>{children}</>;
}
