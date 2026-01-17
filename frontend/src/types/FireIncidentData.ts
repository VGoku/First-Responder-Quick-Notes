/**
 * FireIncidentData.ts
 * --------------------
 * Full data model for Firefighter incidents.
 *
 * Includes:
 * - Basic incident info
 * - Severity rating
 * - Tags
 * - Responding units
 * - Timeline events
 * - Optional photos (base64)
 */

export type FireIncidentData = {
  id: string;
  timestamp: string;

  // Core fields
  fireType: string;
  arrivalConditions: string;
  hazards: string;
  actionsTaken: string;
  notes: string;

  // New fields
  severity?: "Low" | "Moderate" | "High" | "Critical";
  tags?: string[];
  units?: string[]; // e.g., ["Engine 1", "Ladder 3"]
  timeline?: {
    time: string; // "19:42"
    event: string; // "Water on fire"
  }[];

  photos?: string[]; // base64 encoded images
};