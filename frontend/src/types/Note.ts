// export type Note = {
//   id: string;
//   title: string;
//   content: string;
//   tags?: string[];
//   createdAt?: string;
// };

// src/types/Note.ts

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  timestamp: string;     // ISO string
  location?: {
    lat: number;
    lng: number;
  };
}