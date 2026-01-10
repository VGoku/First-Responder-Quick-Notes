/**
 * EMTIncident.tsx
 * ----------------
 * This is the main EMT workspace screen.
 * It now includes:
 * - Timeline quick actions
 * - Notes
 * - Vitals logging
 * - Condition tags
 * - Save + Cancel
 */

import { useState } from "react";

/**
 * This defines the shape of the incident data
 * that gets passed back to App.tsx when saved.
 */
export interface EMTIncidentData {
  timeline: string[];
  notes: string;
  vitals: string[];
  conditions: string[];
  createdAt: string;
}

interface EMTIncidentProps {
  onSave: (data: EMTIncidentData) => void;
  onCancel: () => void;
}

export default function EMTIncident({ onSave, onCancel }: EMTIncidentProps) {
  // Timeline entries (Arrival, Patient Contact, etc.)
  const [timeline, setTimeline] = useState<string[]>([]);

  // Freeform notes
  const [notes, setNotes] = useState("");

  // Vitals log (BP, Pulse, etc.)
  const [vitals, setVitals] = useState<string[]>([]);

  // Condition tags (Conscious, Shock, Trauma, etc.)
  const [conditions, setConditions] = useState<string[]>([]);

  /**
   * Adds a timestamped event to the timeline.
   */
  function addEvent(label: string) {
    const time = new Date().toLocaleTimeString();
    setTimeline((prev) => [...prev, `${label} — ${time}`]);
  }

  /**
   * Saves the entire incident and returns it to App.tsx.
   */
  function handleSave() {
    const incident: EMTIncidentData = {
      timeline,
      notes,
      vitals,
      conditions,
      createdAt: new Date().toISOString(),
    };

    onSave(incident);
  }

  return (
    <div className="flex flex-col gap-10">
      <button
  onClick={onCancel}
  className="text-white bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg w-fit"
>
  ← Back
</button>
      {/* Title */}
      <h1 className="text-3xl font-bold">EMT Incident</h1>
      
      {/* QUICK ACTION TIMELINE BUTTONS */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Timeline Events</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "Arrival",
            "Patient Contact",
            "Treatment Started",
            "Transport Started",
            "Arrived at Hospital",
            "Cleared Scene",
          ].map((label) => (
            <button
              key={label}
              onClick={() => addEvent(label)}
              className="bg-brand-500 hover:bg-brand-600 text-white py-3 rounded-lg"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* VITALS SECTION */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Vitals</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {["BP", "Pulse", "SpO₂", "Respirations", "Temperature"].map((v) => (
            <button
              key={v}
              onClick={() => {
                const time = new Date().toLocaleTimeString();
                setVitals((prev) => [...prev, `${v} recorded — ${time}`]);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* CONDITION TAGS */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Patient Condition</h2>

        <div className="flex flex-wrap gap-3">
          {[
            "Conscious",
            "Unconscious",
            "Breathing",
            "Not Breathing",
            "Bleeding",
            "Shock",
            "Cardiac",
            "Trauma",
          ].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setConditions((prev) =>
                  prev.includes(tag)
                    ? prev.filter((t) => t !== tag)
                    : [...prev, tag]
                );
              }}
              className={`px-4 py-2 rounded-lg border ${
                conditions.includes(tag)
                  ? "bg-green-600 border-green-700"
                  : "bg-slate-800 border-slate-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* NOTES SECTION */}
      <div>
        <label className="block text-lg font-semibold mb-2">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-40 p-3 rounded-lg bg-slate-800 text-white"
          placeholder="Write any details here..."
        />
      </div>

      {/* TIMELINE DISPLAY */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Timeline</h2>
        <ul className="bg-slate-800 p-4 rounded-lg space-y-2">
          {timeline.map((entry, i) => (
            <li key={i} className="text-white/90">
              {entry}
            </li>
          ))}
        </ul>
      </div>

      {/* VITALS DISPLAY */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Vitals Log</h2>
        <ul className="bg-slate-800 p-4 rounded-lg space-y-2">
          {vitals.map((entry, i) => (
            <li key={i} className="text-white/90">
              {entry}
            </li>
          ))}
        </ul>
      </div>

      {/* CONDITION TAGS DISPLAY */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Active Conditions</h2>
        <div className="flex flex-wrap gap-2">
          {conditions.map((c) => (
            <span
              key={c}
              className="px-3 py-1 bg-green-700 rounded-lg text-white text-sm"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Save Incident
        </button>

        <button
          onClick={onCancel}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}