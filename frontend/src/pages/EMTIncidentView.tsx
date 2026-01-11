/**
 * EMTIncidentView.tsx
 * --------------------
 * Displays a saved incident in read‑only mode.
 * Includes:
 * - Back button
 * - Created timestamp
 * - Timeline
 * - Vitals
 * - Conditions
 * - Notes
 * - Photos (NEW)
 */

import type { EMTIncidentData } from "./EMTIncident";

interface Props {
  incident: EMTIncidentData;
  onBack: () => void;
}

export default function EMTIncidentView({ incident, onBack }: Props) {
  return (
    <div className="flex flex-col gap-6">

      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        className="text-white bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg w-fit"
      >
        ← Back
      </button>

      {/* TITLE */}
      <h1 className="text-3xl font-bold">Incident Details</h1>

      {/* CREATED DATE */}
      <p className="text-white/70">
        Created: {new Date(incident.createdAt).toLocaleString()}
      </p>

      {/* TIMELINE */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Timeline</h2>
        <ul className="bg-slate-800 p-4 rounded-lg space-y-2">
          {incident.timeline.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>

      {/* VITALS */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Vitals</h2>
        <ul className="bg-slate-800 p-4 rounded-lg space-y-2">
          {incident.vitals.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
      </div>

      {/* CONDITIONS */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Conditions</h2>
        <div className="flex flex-wrap gap-2">
          {incident.conditions.map((c, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-green-700 rounded-lg text-white text-sm"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* NOTES */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Notes</h2>
        <p className="bg-slate-800 p-4 rounded-lg whitespace-pre-wrap">
          {incident.notes}
        </p>
      </div>

      {/* PHOTOS (NEW) */}
      {incident.photos && incident.photos.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Photos</h2>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-4 gap-3">
            {incident.photos.map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-full h-24 object-cover rounded-lg border border-slate-700"
              />
            ))}
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden flex gap-3 overflow-x-auto">
            {incident.photos.map((src, i) => (
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