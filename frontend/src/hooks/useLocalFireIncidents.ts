/**
 * useLocalFireIncidents.ts
 * -------------------------
 * LocalStorage hook for Firefighter incidents.
 */

import { useState, useEffect } from "react";
import type { FireIncidentData } from "../types/FireIncidentData";

export default function useLocalFireIncidents() {
  // Load from LocalStorage using lazy initialization
  const [fireIncidents, setFireIncidents] = useState<FireIncidentData[]>(() => {
    const saved = localStorage.getItem("fire_incidents");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to LocalStorage whenever incidents change
  useEffect(() => {
    localStorage.setItem("fire_incidents", JSON.stringify(fireIncidents));
  }, [fireIncidents]);

  return { fireIncidents, setFireIncidents };
}