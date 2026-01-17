/**
 * FireDashboard.tsx
 * ------------------
 * Main dashboard for Firefighter mode.
 *
 * Features:
 * - Quick navigation (New Incident, History)
 * - Quick Stats (total incidents, high severity count, common fire type, last incident)
 * - Clean layout matching the rest of the app
 */

import type { ViewState } from "../App";
import type { FireIncidentData } from "../types/FireIncidentData";

type FireDashboardProps = {
  setView: (next: ViewState) => void;
  fireIncidents: FireIncidentData[];
};

export default function FireDashboard({ setView, fireIncidents }: FireDashboardProps) {
  // ------------------------------------------------------------
  // QUICK STATS CALCULATIONS
  // ------------------------------------------------------------

  const totalIncidents = fireIncidents.length;

  const highSeverityCount = fireIncidents.filter(
    (i) => i.severity === "High" || i.severity === "Critical"
  ).length;

  const mostCommonFireType = (() => {
    if (fireIncidents.length === 0) return "None";

    const counts: Record<string, number> = {};
    for (const incident of fireIncidents) {
      counts[incident.fireType] = (counts[incident.fireType] || 0) + 1;
    }

    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  })();

  const lastIncidentTime =
    fireIncidents.length > 0
      ? fireIncidents[fireIncidents.length - 1].timestamp
      : "None";

  return (
    <div className="p-4 space-y-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => setView({ name: "home" })}
        className="
          px-4 py-2 rounded-lg text-sm font-medium
          bg-slate-200 text-slate-800 hover:bg-slate-300
          dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600
        "
      >
        ← Back
      </button>

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">
        Firefighter Dashboard
      </h1>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Incidents */}
        <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
          <h2 className="text-lg font-semibold text-white/80">Total Incidents</h2>
          <p className="text-3xl font-bold mt-1">{totalIncidents}</p>
        </div>

        {/* High Severity */}
        <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
          <h2 className="text-lg font-semibold text-white/80">High Severity</h2>
          <p className="text-3xl font-bold mt-1">{highSeverityCount}</p>
        </div>

        {/* Most Common Fire Type */}
        <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
          <h2 className="text-lg font-semibold text-white/80">Most Common Type</h2>
          <p className="text-xl font-medium mt-1">{mostCommonFireType}</p>
        </div>

        {/* Last Incident */}
        <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
          <h2 className="text-lg font-semibold text-white/80">Last Incident</h2>
          <p className="text-sm mt-1">{lastIncidentTime}</p>
        </div>
      </div>

      {/* QUICK ACTION BUTTONS */}
      <div className="grid grid-cols-1 gap-4 mt-6">
        {/* New Fire Incident */}
        <button
          onClick={() => setView({ name: "fire-incident" })}
          className="
            p-4 rounded-lg border
            bg-white border-red-200 text-red-700
            dark:bg-slate-800 dark:border-red-700 dark:text-red-300
            shadow-sm hover:shadow-md transition
          "
        >
          New Fire Incident
        </button>

        {/* Incident History */}
        <button
          onClick={() => setView({ name: "fire-history" })}
          className="
            p-4 rounded-lg border
            bg-white border-slate-200 text-slate-700
            dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300
            shadow-sm hover:shadow-md transition
          "
        >
          Incident History
        </button>
      </div>

      {/* Placeholder for future features */}
      <div
        className="
          p-4 rounded-lg border
          bg-white border-slate-200 text-slate-600
          dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400
        "
      >
        Firefighter tools coming soon...
      </div>
    </div>
  );
}