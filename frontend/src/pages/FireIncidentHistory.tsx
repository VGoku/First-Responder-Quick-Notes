/**
 * FireIncidentHistory.tsx
 * ------------------------
 * Shows a list of saved Firefighter incidents with:
 * - Search
 * - Filter by fire type
 * - Filter by severity
 * - Filter by tags
 * - Filter by units
 * - Sort (newest / oldest)
 * - Severity dot indicator
 */

import { useState, useMemo } from "react";
import type { ViewState } from "../App";
import type { FireIncidentData } from "../types/FireIncidentData";

type FireIncidentHistoryProps = {
  setView: (next: ViewState) => void;
  incidents: FireIncidentData[];
};

export default function FireIncidentHistory({
  setView,
  incidents,
}: FireIncidentHistoryProps) {
  // ---------------------------------------
  // SEARCH / FILTER / SORT STATE
  // ---------------------------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterTag, setFilterTag] = useState("all");
  const [filterUnit, setFilterUnit] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // ---------------------------------------
  // COLLECT UNIQUE TAGS AND UNITS
  // ---------------------------------------
  const allTags = useMemo(() => {
    const set = new Set<string>();
    incidents.forEach((i) => i.tags?.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [incidents]);

  const allUnits = useMemo(() => {
    const set = new Set<string>();
    incidents.forEach((i) => i.units?.forEach((u) => set.add(u)));
    return Array.from(set);
  }, [incidents]);

  // ---------------------------------------
  // SEVERITY DOT COLORS
  // ---------------------------------------
  const severityColors: Record<string, string> = {
    Low: "bg-green-500",
    Moderate: "bg-yellow-400",
    High: "bg-orange-500",
    Critical: "bg-red-600",
  };

  // ---------------------------------------
  // FILTER + SEARCH + SORT LOGIC
  // ---------------------------------------
  const filtered = incidents
    .filter((incident) => {
      // Fire type filter
      if (filterType !== "all" && incident.fireType !== filterType) {
        return false;
      }

      // Severity filter
      if (filterSeverity !== "all" && incident.severity !== filterSeverity) {
        return false;
      }

      // Tag filter
      if (filterTag !== "all" && !(incident.tags || []).includes(filterTag)) {
        return false;
      }

      // Unit filter
      if (filterUnit !== "all" && !(incident.units || []).includes(filterUnit)) {
        return false;
      }

      // Search filter
      const text = searchTerm.toLowerCase();
      return (
        incident.fireType.toLowerCase().includes(text) ||
        incident.arrivalConditions.toLowerCase().includes(text) ||
        incident.hazards.toLowerCase().includes(text) ||
        incident.actionsTaken.toLowerCase().includes(text) ||
        incident.notes.toLowerCase().includes(text)
      );
    })
    .sort((a, b) => {
      const tA = new Date(a.timestamp).getTime();
      const tB = new Date(b.timestamp).getTime();
      return sortOrder === "newest" ? tB - tA : tA - tB;
    });

  return (
    <div className="p-4 space-y-6">

      {/* BACK BUTTON */}
      <button
        onClick={() => setView({ name: "fire-dashboard" })}
        className="
          px-4 py-2 rounded-lg text-sm font-medium
          bg-slate-200 text-slate-800 hover:bg-slate-300
          dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600
        "
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">
        Firefighter Incident History
      </h1>

      {/* --------------------------------------- */}
      {/* SEARCH / FILTER / SORT CONTROLS         */}
      {/* --------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search incidents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full p-3 rounded-lg border
            bg-white border-slate-300 text-slate-800
            dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100
          "
        />

        {/* FIRE TYPE FILTER */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="
            w-full p-3 rounded-lg border
            bg-white border-slate-300 text-slate-800
            dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100
          "
        >
          <option value="all">All Fire Types</option>
          <option value="Structure Fire">Structure Fire</option>
          <option value="Vehicle Fire">Vehicle Fire</option>
          <option value="Wildland Fire">Wildland Fire</option>
          <option value="Electrical Fire">Electrical Fire</option>
          <option value="Alarm Activation">Alarm Activation</option>
        </select>

        {/* SEVERITY FILTER */}
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          className="
            w-full p-3 rounded-lg border
            bg-white border-slate-300 text-slate-800
            dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100
          "
        >
          <option value="all">All Severities</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>

        {/* TAG FILTER */}
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="
            w-full p-3 rounded-lg border
            bg-white border-slate-300 text-slate-800
            dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100
          "
        >
          <option value="all">All Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        {/* UNIT FILTER */}
        <select
          value={filterUnit}
          onChange={(e) => setFilterUnit(e.target.value)}
          className="
            w-full p-3 rounded-lg border
            bg-white border-slate-300 text-slate-800
            dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100
          "
        >
          <option value="all">All Units</option>
          {allUnits.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>

        {/* SORT ORDER */}
        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value as "newest" | "oldest")
          }
          className="
            w-full p-3 rounded-lg border
            bg-white border-slate-300 text-slate-800
            dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100
          "
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* --------------------------------------- */}
      {/* INCIDENT LIST                           */}
      {/* --------------------------------------- */}
      {filtered.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">
          No incidents match your filters.
        </p>
      ) : (
        <div className="space-y-4">
          {filtered.map((incident, index) => (
            <div
              key={incident.id}
              onClick={() => setView({ name: "fire-view", index })}
              className="
                p-4 rounded-lg border cursor-pointer flex items-center gap-4
                bg-white border-slate-200 text-slate-800
                dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100
                hover:bg-slate-50 dark:hover:bg-slate-700
              "
            >
              {/* SEVERITY DOT */}
              {incident.severity && (
                <span
                  className={`
                    w-4 h-4 rounded-full
                    ${severityColors[incident.severity]}
                  `}
                />
              )}

              <div>
                <h2 className="text-xl font-semibold">{incident.fireType}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {incident.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}