"use client";

import { useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const saved = localStorage.getItem("credex-dark-mode");

    if (saved === "true") {
      document.documentElement.classList.add("dark");
      return true;
    }

    return false;
  });

  function toggleDarkMode() {
    const next = !dark;

    setDark(next);

    localStorage.setItem(
      "credex-dark-mode",
      String(next)
    );

    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className="rounded-xl border bg-white px-4 py-2 text-sm font-semibold text-black"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}