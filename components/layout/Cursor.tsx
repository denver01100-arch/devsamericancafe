"use client";

import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    // Disable the custom cursor
    document.body.dataset.cursor = "off";

    // Restore the default browser cursor
    document.body.style.cursor = "auto";

    return () => {
      document.body.dataset.cursor = "off";
      document.body.style.cursor = "auto";
    };
  }, []);

  // Render nothing
  return null;
}
