/**
 * Settings.tsx
 * -------------
 * Global app settings for EMT, Fire, and Police modes.
 *
 * This version:
 * - Fixes inverted theme colors
 * - Uses readable light/dark card backgrounds
 * - Removes ESLint template literal issues
 * - Uses clear variable names
 * - Adds comments for clarity
 */

import { useEffect, useState } from "react";

type AgencyMode = "EMT" | "Fire" | "Police";

export default function Settings({ onBack }: { onBack: () => void }) {
  /**
   * LOAD SETTINGS FROM LOCALSTORAGE
   * -------------------------------
   * These values initialize from LocalStorage on first render.
   */

  const [themeMode, setThemeMode] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("settings_themeMode");
    return saved === "light" ? "light" : "dark"; // default to dark
  });

  const [autoTimestamp, setAutoTimestamp] = useState<boolean>(() => {
    const saved = localStorage.getItem("settings_autoTimestamp");
    return saved === "false" ? false : true; // default true
  });

  const [defaultAgency, setDefaultAgency] = useState<AgencyMode>(() => {
    const saved = localStorage.getItem("settings_defaultAgency");
    return saved === "Fire" || saved === "Police" ? saved : "EMT";
  });

  const [vibrationEnabled, setVibrationEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem("settings_vibration");
    return saved === "true";
  });

  /**
   * SAVE SETTINGS TO LOCALSTORAGE
   * ------------------------------
   * Runs whenever a setting changes.
   */
  useEffect(() => {
    localStorage.setItem("settings_themeMode", themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem("settings_autoTimestamp", String(autoTimestamp));
  }, [autoTimestamp]);

  useEffect(() => {
    localStorage.setItem("settings_defaultAgency", defaultAgency);
  }, [defaultAgency]);

  useEffect(() => {
    localStorage.setItem("settings_vibration", String(vibrationEnabled));
  }, [vibrationEnabled]);

  /**
   * APPLY THEME MODE TO <html>
   * --------------------------
   * This is what actually triggers Tailwind's dark mode.
   */
  useEffect(() => {
  const html = document.documentElement;

  if (themeMode === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
}, [themeMode]);

  /**
   * REUSABLE CARD STYLE
   * -------------------
   * Light mode → soft gray
   * Dark mode → deep slate
   */
  const cardStyle =
    "p-4 rounded-lg bg-slate-100 text-black dark:bg-slate-800 dark:text-white";

  return (
    <div className="flex flex-col gap-6 text-black dark:text-white">

      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        className="
          px-4 py-2 rounded-lg w-fit
          bg-slate-300 hover:bg-slate-400 text-black
          dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white
        "
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold">Settings</h1>

      {/* THEME MODE */}
      <div className={cardStyle}>
        <h2 className="text-xl font-semibold mb-2">Theme</h2>

        <div className="flex gap-4">
          {/* DARK MODE BUTTON */}
          <button
            onClick={() => setThemeMode("dark")}
            className={
              themeMode === "dark"
                ? "px-4 py-2 rounded-lg bg-blue-600 text-white"
                : "px-4 py-2 rounded-lg bg-slate-300 text-black dark:bg-slate-700 dark:text-white"
            }
          >
            Dark Mode
          </button>

          {/* LIGHT MODE BUTTON */}
          <button
            onClick={() => setThemeMode("light")}
            className={
              themeMode === "light"
                ? "px-4 py-2 rounded-lg bg-blue-600 text-white"
                : "px-4 py-2 rounded-lg bg-slate-300 text-black dark:bg-slate-700 dark:text-white"
            }
          >
            Light Mode
          </button>
        </div>
      </div>

      {/* AUTO TIMESTAMP */}
      <div className={cardStyle}>
        <h2 className="text-xl font-semibold mb-2">Auto Timestamp</h2>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={autoTimestamp}
            onChange={(e) => setAutoTimestamp(e.target.checked)}
          />
          <span>Automatically timestamp timeline entries</span>
        </label>
      </div>

      {/* DEFAULT AGENCY */}
      <div className={cardStyle}>
        <h2 className="text-xl font-semibold mb-2">Default Agency</h2>

        <div className="flex gap-4">
          {(["EMT", "Fire", "Police"] as AgencyMode[]).map((agency) => (
            <button
              key={agency}
              onClick={() => setDefaultAgency(agency)}
              className={
                defaultAgency === agency
                  ? "px-4 py-2 rounded-lg bg-blue-600 text-white"
                  : "px-4 py-2 rounded-lg bg-slate-300 text-black dark:bg-slate-700 dark:text-white"
              }
            >
              {agency}
            </button>
          ))}
        </div>
      </div>

      {/* VIBRATION FEEDBACK */}
      <div className={cardStyle}>
        <h2 className="text-xl font-semibold mb-2">Vibration Feedback</h2>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={vibrationEnabled}
            onChange={(e) => setVibrationEnabled(e.target.checked)}
          />
          <span>Enable vibration on button press (mobile)</span>
        </label>
      </div>
    </div>
  );
}