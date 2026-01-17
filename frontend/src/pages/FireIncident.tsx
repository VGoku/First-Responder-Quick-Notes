/**
 * FireIncident.tsx
 * -----------------
 * New Firefighter Incident Entry Page
 *
 * Features:
 * - Full incident form (fire type, severity, tags, units, timeline, notes)
 * - Photo upload with compression (300px wide)
 * - Max 3 photos allowed
 * - Auto-save in-progress report to localStorage
 * - Load duplicate or in-progress draft (lazy initialization)
 * - Clean variable names + comments
 */

import { useState, useEffect } from "react";
import type { ViewState } from "../App";
import type { FireIncidentData } from "../types/FireIncidentData";

type FireIncidentProps = {
  setView: (next: ViewState) => void;
  onSave: (data: FireIncidentData) => void;
};

// ------------------------------------------------------------
// Helper: Compress image to 300px width (JPEG, 70% quality)
// ------------------------------------------------------------
async function compressImage(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);

  const canvas = document.createElement("canvas");
  const scale = 300 / bitmap.width;
  canvas.width = 300;
  canvas.height = bitmap.height * scale;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL("image/jpeg", 0.7);
}

// ------------------------------------------------------------
// Load draft or duplicate BEFORE initializing state
// ------------------------------------------------------------
function loadInitialData() {
  const duplicate = localStorage.getItem("fire_duplicate_temp");
  const draft = localStorage.getItem("fire_in_progress");

  if (duplicate) {
    const data = JSON.parse(duplicate);
    localStorage.removeItem("fire_duplicate_temp");
    return data;
  }

  if (draft) {
    return JSON.parse(draft);
  }

  return null;
}

const initial = loadInitialData();

export default function FireIncident({ setView, onSave }: FireIncidentProps) {
  // ------------------------------------------------------------
  // BASIC FIELDS (lazy initialization)
  // ------------------------------------------------------------
  const [fireType, setFireType] = useState(initial?.fireType || "");
  const [arrivalConditions, setArrivalConditions] = useState(
    initial?.arrivalConditions || ""
  );
  const [hazards, setHazards] = useState(initial?.hazards || "");
  const [actionsTaken, setActionsTaken] = useState(
    initial?.actionsTaken || ""
  );
  const [notes, setNotes] = useState(initial?.notes || "");

  // ------------------------------------------------------------
  // SEVERITY
  // ------------------------------------------------------------
  const [severity, setSeverity] = useState<
    "Low" | "Moderate" | "High" | "Critical" | ""
  >(initial?.severity || "");

  // ------------------------------------------------------------
  // TAGS
  // ------------------------------------------------------------
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(initial?.tags || []);

  function addTag() {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    setTags(tags.filter((t) => t !== tag));
  }

  // ------------------------------------------------------------
  // UNITS
  // ------------------------------------------------------------
  const presetUnits = [
    "Engine 1",
    "Engine 2",
    "Ladder 3",
    "Battalion Chief",
    "Medic Unit",
  ];

  const [units, setUnits] = useState<string[]>(initial?.units || []);
  const [customUnit, setCustomUnit] = useState("");

  function toggleUnit(unit: string) {
    if (units.includes(unit)) {
      setUnits(units.filter((u) => u !== unit));
    } else {
      setUnits([...units, unit]);
    }
  }

  function addCustomUnit() {
    if (customUnit.trim() !== "" && !units.includes(customUnit.trim())) {
      setUnits([...units, customUnit.trim()]);
      setCustomUnit("");
    }
  }

  // ------------------------------------------------------------
  // TIMELINE
  // ------------------------------------------------------------
  const [timeline, setTimeline] = useState(initial?.timeline || []);
  const [timelineEvent, setTimelineEvent] = useState("");

  function addTimelineEvent() {
    if (timelineEvent.trim() !== "") {
      const now = new Date();
      const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setTimeline([...timeline, { time, event: timelineEvent.trim() }]);
      setTimelineEvent("");
    }
  }

  function removeTimelineEvent(index: number) {
    setTimeline(
  timeline.filter(
    (_: { time: string; event: string }, i: number) => i !== index
  )
);
  }

  // ------------------------------------------------------------
  // PHOTOS (compressed + max 3)
  // ------------------------------------------------------------
  const [photos, setPhotos] = useState<string[]>(initial?.photos || []);
  const [photoError, setPhotoError] = useState("");

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (photos.length >= 3) {
      setPhotoError("Maximum of 3 photos allowed.");
      return;
    }

    try {
      const compressed = await compressImage(file);
      setPhotos([...photos, compressed]);
      setPhotoError("");
    } catch {
      setPhotoError("Failed to process image.");
    }
  }

  function removePhoto(index: number) {
    setPhotos(photos.filter((_, i) => i !== index));
  }

  // ------------------------------------------------------------
  // AUTO-SAVE DRAFT
  // ------------------------------------------------------------
  useEffect(() => {
    const draft = {
      fireType,
      arrivalConditions,
      hazards,
      actionsTaken,
      notes,
      severity,
      tags,
      units,
      timeline,
      photos,
    };

    localStorage.setItem("fire_in_progress", JSON.stringify(draft));
  }, [
    fireType,
    arrivalConditions,
    hazards,
    actionsTaken,
    notes,
    severity,
    tags,
    units,
    timeline,
    photos,
  ]);

  // ------------------------------------------------------------
  // SAVE HANDLER
  // ------------------------------------------------------------
  function handleSave() {
    const newIncident: FireIncidentData = {
      id: crypto.randomUUID(),
      timestamp: new Date().toLocaleString(),
      fireType,
      arrivalConditions,
      hazards,
      actionsTaken,
      notes,
      severity: severity || undefined,
      tags,
      units,
      timeline,
      photos,
    };

    localStorage.removeItem("fire_in_progress");
    onSave(newIncident);
  }

  // ------------------------------------------------------------
  // UI
  // ------------------------------------------------------------
  return (
    <div className="p-4 space-y-8">
      {/* BACK */}
      <button
        onClick={() => setView({ name: "fire-dashboard" })}
        className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">
        New Fire Incident
      </h1>

      <div className="space-y-6">
        {/* FIRE TYPE */}
        <div>
          <label className="block font-semibold mb-1">Fire Type</label>
          <select
            value={fireType}
            onChange={(e) => setFireType(e.target.value)}
            className="w-full p-3 rounded-lg border bg-white dark:bg-slate-800"
          >
            <option value="">Select fire type...</option>
            <option value="Structure Fire">Structure Fire</option>
            <option value="Vehicle Fire">Vehicle Fire</option>
            <option value="Wildland Fire">Wildland Fire</option>
            <option value="Electrical Fire">Electrical Fire</option>
            <option value="Alarm Activation">Alarm Activation</option>
          </select>
        </div>

        {/* SEVERITY */}
        <div>
          <label className="block font-semibold mb-1">Severity</label>
          <select
            value={severity}
            onChange={(e) =>
              setSeverity(
                e.target.value as "Low" | "Moderate" | "High" | "Critical" | ""
              )
            }
            className="w-full p-3 rounded-lg border bg-white dark:bg-slate-800"
          >
            <option value="">Select severity...</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        {/* ARRIVAL CONDITIONS */}
        <div>
          <label className="block font-semibold mb-1">Arrival Conditions</label>
          <textarea
            value={arrivalConditions}
            onChange={(e) => setArrivalConditions(e.target.value)}
            className="w-full p-3 rounded-lg border h-24 bg-white dark:bg-slate-800"
          />
        </div>

        {/* HAZARDS */}
        <div>
          <label className="block font-semibold mb-1">Hazards</label>
          <textarea
            value={hazards}
            onChange={(e) => setHazards(e.target.value)}
            className="w-full p-3 rounded-lg border h-24 bg-white dark:bg-slate-800"
          />
        </div>

        {/* ACTIONS TAKEN */}
        <div>
          <label className="block font-semibold mb-1">Actions Taken</label>
          <textarea
            value={actionsTaken}
            onChange={(e) => setActionsTaken(e.target.value)}
            className="w-full p-3 rounded-lg border h-24 bg-white dark:bg-slate-800"
          />
        </div>

        {/* NOTES */}
        <div>
          <label className="block font-semibold mb-1">Additional Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 rounded-lg border h-24 bg-white dark:bg-slate-800"
          />
        </div>

        {/* TAGS */}
        <div>
          <label className="block font-semibold mb-1">Tags</label>
          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 p-3 rounded-lg border bg-white dark:bg-slate-800"
              placeholder="Add tag..."
            />
            <button
              onClick={addTag}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-300 dark:bg-slate-700 rounded-full cursor-pointer"
                onClick={() => removeTag(tag)}
              >
                {tag} ✕
              </span>
            ))}
          </div>
        </div>

        {/* UNITS */}
        <div>
          <label className="block font-semibold mb-1">Units Responding</label>

          <div className="grid grid-cols-2 gap-2">
            {presetUnits.map((unit) => (
              <label key={unit} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={units.includes(unit)}
                  onChange={() => toggleUnit(unit)}
                />
                {unit}
              </label>
            ))}
          </div>

          <div className="flex gap-2 mt-3">
            <input
              value={customUnit}
              onChange={(e) => setCustomUnit(e.target.value)}
              className="flex-1 p-3 rounded-lg border bg-white dark:bg-slate-800"
              placeholder="Add custom unit..."
            />
            <button
              onClick={addCustomUnit}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {units.map((unit) => (
              <span
                key={unit}
                className="px-3 py-1 bg-slate-300 dark:bg-slate-700 rounded-full cursor-pointer"
                onClick={() => toggleUnit(unit)}
              >
                {unit} ✕
              </span>
            ))}
          </div>
        </div>

        {/* TIMELINE */}
        <div>
          <label className="block font-semibold mb-1">Timeline Events</label>

          <div className="flex gap-2">
            <input
              value={timelineEvent}
              onChange={(e) => setTimelineEvent(e.target.value)}
              className="flex-1 p-3 rounded-lg border bg-white dark:bg-slate-800"
              placeholder="Event description..."
            />
            <button
              onClick={addTimelineEvent}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              Add
            </button>
          </div>

          <div className="space-y-2 mt-3">
            {timeline.map((item: { time: string; event: string }, i: number) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-slate-200 dark:bg-slate-700 flex justify-between"
              >
                <span>
                  <strong>{item.time}</strong> — {item.event}
                </span>
                <button
                  onClick={() => removeTimelineEvent(i)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* PHOTOS */}
        <div>
          <label className="block font-semibold mb-1">Photos (max 3)</label>

          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="p-2"
          />

          {photoError && (
            <p className="text-red-600 dark:text-red-400">{photoError}</p>
          )}

          <div className="flex flex-wrap gap-4 mt-3">
            {photos.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt="Uploaded"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SAVE */}
        <button
          onClick={handleSave}
          className="
            w-full p-4 rounded-lg text-lg font-semibold
            bg-red-600 text-white hover:bg-red-700
            dark:bg-red-500 dark:hover:bg-red-400
          "
        >
          Save Incident
        </button>
      </div>
    </div>
  );
}