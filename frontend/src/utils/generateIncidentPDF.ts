/**
 * generateIncidentPDF.ts
 * -----------------------
 * A reusable PDF generator for EMT, Fire, and Police incidents.
 *
 * This utility:
 * - Accepts an incident object
 * - Builds a clean, professional PDF
 * - Includes timeline, vitals, conditions, notes, and photos
 * - Works offline (client-side only)
 * - Requires no backend
 *
 * This is intentionally written with clean variable names and
 * clear comments so recruiters can easily understand the logic.
 */

import jsPDF from "jspdf";
import type { EMTIncidentData } from "../pages/EMTIncident";

/**
 * Generates a PDF file for a given incident and triggers download.
 */
export function generateIncidentPDF(incident: EMTIncidentData) {
  // Create a new PDF document
  const pdf = new jsPDF({
    unit: "pt",
    format: "letter",
  });

  // Cursor for vertical spacing
  let cursorY = 40;

  // -----------------------------
  // HEADER
  // -----------------------------
  pdf.setFont("Helvetica", "bold");
  pdf.setFontSize(20);
  pdf.text("Incident Report", 40, cursorY);
  cursorY += 30;

  pdf.setFont("Helvetica", "normal");
  pdf.setFontSize(12);
  pdf.text(`Created: ${new Date(incident.createdAt).toLocaleString()}`, 40, cursorY);
  cursorY += 25;

  // -----------------------------
  // TIMELINE SECTION
  // -----------------------------
  pdf.setFont("Helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("Timeline", 40, cursorY);
  cursorY += 20;

  pdf.setFont("Helvetica", "normal");
  incident.timeline.forEach((timelineEntry: string) => {
    pdf.text(`• ${timelineEntry}`, 50, cursorY);
    cursorY += 18;
  });

  cursorY += 15;

  // -----------------------------
  // VITALS SECTION
  // -----------------------------
  pdf.setFont("Helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("Vitals", 40, cursorY);
  cursorY += 20;

  pdf.setFont("Helvetica", "normal");
  incident.vitals.forEach((vitalEntry: string) => {
    pdf.text(`• ${vitalEntry}`, 50, cursorY);
    cursorY += 18;
  });

  cursorY += 15;

  // -----------------------------
  // CONDITIONS SECTION
  // -----------------------------
  pdf.setFont("Helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("Conditions", 40, cursorY);
  cursorY += 20;

  pdf.setFont("Helvetica", "normal");
  incident.conditions.forEach((conditionTag: string) => {
    pdf.text(`• ${conditionTag}`, 50, cursorY);
    cursorY += 18;
  });

  cursorY += 15;

  // -----------------------------
  // NOTES SECTION
  // -----------------------------
  pdf.setFont("Helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("Notes", 40, cursorY);
  cursorY += 20;

  pdf.setFont("Helvetica", "normal");

  // Wrap long notes to fit inside the page width
  const wrappedNoteLines = pdf.splitTextToSize(incident.notes, 520);

  wrappedNoteLines.forEach((noteLine: string) => {
    pdf.text(noteLine, 50, cursorY);
    cursorY += 18;
  });

  cursorY += 20;

  // -----------------------------
  // PHOTOS SECTION
  // -----------------------------
  if (incident.photos && incident.photos.length > 0) {
    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text("Photos", 40, cursorY);
    cursorY += 20;

    incident.photos.forEach((photoBase64: string) => {
      // Add image scaled to a reasonable size
      pdf.addImage(photoBase64, "JPEG", 50, cursorY, 200, 150);
      cursorY += 170;

      // If we reach the bottom of the page, start a new one
      if (cursorY > 700) {
        pdf.addPage();
        cursorY = 40;
      }
    });
  }

  // -----------------------------
  // SAVE PDF
  // -----------------------------
  pdf.save("incident-report.pdf");
}