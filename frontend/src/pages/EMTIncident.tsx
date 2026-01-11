/**
 * EMTIncident.tsx
 * ----------------
 * This screen is used for BOTH:
 *  - Creating a new incident
 *  - Editing an existing incident
 *
 * If initialData is provided, the form loads in EDIT MODE.
 */

import { useState } from "react";
import PhotoCapture from "../components/PhotoCapture";

export interface EMTIncidentData {
  timeline: string[];
  notes: string;
  vitals: string[];
  conditions: string[];
  createdAt: string;
  photos: string[];
}

interface EMTIncidentProps {
  onSave: (data: EMTIncidentData, editIndex?: number) => void;
  onCancel: () => void;

  // Optional props for editing an existing incident
  initialData?: EMTIncidentData;
  editIndex?: number;
}

export default function EMTIncident({
  onSave,
  onCancel,
  initialData,
  editIndex,
}: EMTIncidentProps) {
  /**
   * Load initial data if editing an existing incident.
   * Otherwise start with empty fields.
   */
  const [timeline, setTimeline] = useState<string[]>(initialData?.timeline || []);
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [vitals, setVitals] = useState<string[]>(initialData?.vitals || []);
  const [conditions, setConditions] = useState<string[]>(initialData?.conditions || []);
  const [photos, setPhotos] = useState<string[]>(initialData?.photos || []);
  /**
   * Add a timestamped event to the timeline.
   */
  function addEvent(label: string) {
    const time = new Date().toLocaleTimeString();
    setTimeline((prev) => [...prev, `${label} — ${time}`]);
  }

  /**
   * Save the incident.
   * If editIndex is provided, App.tsx will overwrite the old incident.
   */
  function handleSave() {
    const incident: EMTIncidentData = {
      timeline,
      notes,
      vitals,
      conditions,
      photos,
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };

    onSave(incident, editIndex);
  }

  return (
    <div className="flex flex-col gap-10">

      {/* BACK BUTTON */}
      <button
        onClick={onCancel}
        className="text-white bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg w-fit"
      >
        ← Back
      </button>

      {/* TITLE */}
      <h1 className="text-3xl font-bold">
        {initialData ? "Edit Incident" : "New EMT Incident"}
      </h1>

      {/* TIMELINE BUTTONS */}
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

      {/* VITALS */}
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

      {/* PHOTO CAPTURE */}
<div>
  <h2 className="text-xl font-semibold mb-2">Photos</h2>

  <PhotoCapture
    onPhoto={(base64) => setPhotos((prev) => [...prev, base64])}
  />

  {/* PHOTO GALLERY */}
  <div className="mt-4">
    <h3 className="text-lg font-semibold mb-2">Gallery</h3>

    {/* Desktop Grid */}
    <div className="hidden md:grid grid-cols-4 gap-3">
      {photos.map((src, i) => (
        <div key={i} className="relative">
          <img
            src={src}
            className="w-full h-24 object-cover rounded-lg border border-slate-700"
          />

          {/* Delete button */}
          <button
            onClick={() =>
              setPhotos((prev) => prev.filter((_, index) => index !== i))
            }
            className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
          >
            ✕
          </button>
        </div>
      ))}
    </div>

    {/* Mobile Horizontal Scroll */}
    <div className="md:hidden flex gap-3 overflow-x-auto">
      {photos.map((src, i) => (
        <div key={i} className="relative flex-shrink-0">
          <img
            src={src}
            className="w-24 h-24 object-cover rounded-lg border border-slate-700"
          />

          {/* Delete button */}
          <button
            onClick={() =>
              setPhotos((prev) => prev.filter((_, index) => index !== i))
            }
            className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
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

      {/* NOTES */}
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

      {/* CONDITIONS DISPLAY */}
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

      {/* SAVE BUTTON */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          {initialData ? "Save Changes" : "Save Incident"}
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