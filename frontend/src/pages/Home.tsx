/**
 * Home.tsx
 * --------
 * The main landing screen for the app.
 *
 * This component:
 * - Shows EMT Mode button
 * - Shows Firefighter Mode button
 * - Shows Settings button
 * - Shows recent notes
 * - Uses setView() to navigate between screens
 *
 * Props:
 * - setView: navigation function from App.tsx
 * - notes: list of saved notes
 */

import type { Note } from "../types/Note";
import type { ViewState } from "../App";

type HomeProps = {
  setView: (nextView: ViewState) => void;
  notes: Note[];
};

export default function Home({ setView, notes }: HomeProps) {
  return (
    <div className="text-center">

      {/* TITLE */}
      <h1 className="text-4xl font-bold tracking-tight mb-2 text-slate-800 dark:text-white">
        Quick Notes for First Responders
      </h1>

      {/* SUBTITLE */}
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
        Capture vital info fast — timestamp, location, and tags.
      </p>

      {/* EMT MODE BUTTON */}
      <button
        onClick={() => setView({ name: "emt" })}
        className="
          px-6 py-3 rounded-lg text-lg mb-6 font-medium
          bg-blue-600 text-white hover:bg-blue-700
          dark:bg-blue-500 dark:hover:bg-blue-400 dark:text-white
        "
      >
        EMT Mode
      </button>

      {/* FIREFIGHTER MODE BUTTON */}
      <button
        onClick={() => setView({ name: "fire-dashboard" })}
        className="
          px-6 py-3 rounded-lg text-lg mb-6 font-medium
          bg-red-600 text-white hover:bg-red-700
          dark:bg-red-500 dark:hover:bg-red-400 dark:text-white
        "
      >
        Firefighter Mode
      </button>

      {/* SETTINGS BUTTON */}
      <button
        onClick={() => setView({ name: "settings" })}
        className="
          px-6 py-3 rounded-lg text-lg mb-10 font-medium
          bg-slate-200 text-slate-800 hover:bg-slate-300
          dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600
        "
      >
        Settings
      </button>

      {/* NOTES LIST */}
      {notes.length === 0 ? (
        <div className="text-slate-500 dark:text-slate-400">
          No recent notes
        </div>
      ) : (
        <div className="grid gap-4">
          {notes.map((n) => (
            <div
              key={n.id}
              onClick={() => setView({ name: "view", id: n.id })}
              className="
                p-4 rounded-xl cursor-pointer transition shadow-sm
                bg-white text-slate-800 border border-slate-200
                hover:bg-slate-50
                dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700
                dark:hover:bg-slate-700
              "
            >
              <h2 className="text-xl font-semibold">{n.title}</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {n.timestamp}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}