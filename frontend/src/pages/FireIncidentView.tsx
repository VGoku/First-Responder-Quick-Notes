/**
 * FireIncidentView.tsx
 * ---------------------
 * Detailed view for a single Firefighter incident.
 *
 * Features:
 * - Full incident details
 * - Severity indicator (dot + label)
 * - Timeline entries
 * - Tags, units, notes
 * - Photos (grid + mobile scroll)
 * - Edit button for quick access
 */

import type { ViewState } from "../App";
import type { FireIncidentData } from "../types/FireIncidentData";

type Props = {
  incident: FireIncidentData;
  index: number;
  setView: (next: ViewState) => void;
};

export default function FireIncidentView({ incident, index, setView }: Props) {
  // ------------------------------------------------------------
  // Severity dot color helper
  // ------------------------------------------------------------
  const severityColor: Record<string, string> = {
    Low: "bg-green-500",
    Moderate: "bg-yellow-500",
    High: "bg-orange-500",
    Critical: "bg-red-600",
  };

  return (
    <div className="p-4 space-y-8">
      {/* BACK BUTTON */}
      <button
        onClick={() => setView({ name: "fire-history" })}
        className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700"
      >
        ← Back
      </button>

      {/* TITLE + EDIT BUTTON */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">
          Fire Incident Details
        </h1>

        <button
          onClick={() =>
            setView({
              name: "fire-edit",
              index,
            })
          }
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Edit
        </button>
      </div>

      {/* CREATED DATE */}
      <p className="text-white/70">Created: {incident.timestamp}</p>

      {/* FIRE TYPE */}
      <div>
        <h2 className="text-xl font-semibold mb-1">Fire Type</h2>
        <p className="bg-slate-800 p-3 rounded-lg">{incident.fireType}</p>
      </div>

      {/* SEVERITY */}
      <div>
        <h2 className="text-xl font-semibold mb-1">Severity</h2>

        {incident.severity ? (
          <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg w-fit">
            <span
              className={`w-4 h-4 rounded-full ${
                severityColor[incident.severity]
              }`}
            />
            <span className="font-medium">{incident.severity}</span>
          </div>
        ) : (
          <p className="text-white/60">No severity recorded</p>
        )}
      </div>

      {/* ARRIVAL CONDITIONS */}
      <div>
        <h2 className="text-xl font-semibold mb-1">Arrival Conditions</h2>
        <p className="bg-slate-800 p-3 rounded-lg whitespace-pre-wrap">
          {incident.arrivalConditions || "None"}
        </p>
      </div>

      {/* HAZARDS */}
      <div>
        <h2 className="text-xl font-semibold mb-1">Hazards</h2>
        <p className="bg-slate-800 p-3 rounded-lg whitespace-pre-wrap">
          {incident.hazards || "None"}
        </p>
      </div>

      {/* ACTIONS TAKEN */}
      <div>
        <h2 className="text-xl font-semibold mb-1">Actions Taken</h2>
        <p className="bg-slate-800 p-3 rounded-lg whitespace-pre-wrap">
          {incident.actionsTaken || "None"}
        </p>
      </div>

      {/* NOTES */}
      <div>
        <h2 className="text-xl font-semibold mb-1">Notes</h2>
        <p className="bg-slate-800 p-3 rounded-lg whitespace-pre-wrap">
          {incident.notes || "None"}
        </p>
      </div>

      {/* TAGS */}
      {incident.tags && incident.tags.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-1">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {incident.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-700 rounded-lg text-white text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* UNITS */}
      {incident.units && incident.units.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-1">Units Responding</h2>
          <div className="flex flex-wrap gap-2">
            {incident.units.map((unit: string) => (
              <span
                key={unit}
                className="px-3 py-1 bg-slate-700 rounded-lg text-white text-sm"
              >
                {unit}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* TIMELINE */}
      {incident.timeline && incident.timeline.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-1">Timeline</h2>
          <ul className="bg-slate-800 p-4 rounded-lg space-y-2">
            {incident.timeline.map(
              (
                item: { time: string; event: string },
                i: number
              ) => (
                <li key={i}>
                  <strong>{item.time}</strong> — {item.event}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* PHOTOS */}
      {incident.photos && incident.photos.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Photos</h2>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-4 gap-3">
            {incident.photos.map((src: string, i: number) => (
              <img
                key={i}
                src={src}
                className="w-full h-24 object-cover rounded-lg border border-slate-700"
              />
            ))}
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden flex gap-3 overflow-x-auto">
            {incident.photos.map((src: string, i: number) => (
              <img
                key={i}
                src={src}
                className="w-24 h-24 object-cover rounded-lg border border-slate-700 flex-shrink-0"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}