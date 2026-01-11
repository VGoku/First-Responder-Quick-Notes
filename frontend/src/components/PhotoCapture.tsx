/**
 * PhotoCapture.tsx
 * -----------------
 * A reusable component for capturing or uploading photos.
 * - Works on mobile (camera)
 * - Works on desktop (file upload)
 * - Returns base64 images to the parent component
 *
 * Props:
 *   onPhoto: (base64: string) => void
 */

import { useRef } from "react";

interface PhotoCaptureProps {
  onPhoto: (base64: string) => void;
}

export default function PhotoCapture({ onPhoto }: PhotoCaptureProps) {
  // Hidden file input for uploading photos
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * Converts a File object to a base64 string.
   */
  function fileToBase64(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        onPhoto(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  }

  /**
   * Triggered when the user selects a file from the upload dialog.
   */
  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) fileToBase64(file);
  }

  /**
   * Opens the hidden file input.
   */
  function openFilePicker() {
    fileInputRef.current?.click();
  }

  return (
    <div className="flex flex-col gap-4">

      {/* TAKE PHOTO (mobile devices will open camera) */}
      <button
        onClick={openFilePicker}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg"
      >
        📸 Take or Upload Photo
      </button>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"  // Opens camera on mobile
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}