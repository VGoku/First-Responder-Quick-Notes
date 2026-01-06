// import React from "react";
// import type { Note } from "../types/Note";
// import { ClipboardDocumentIcon, ClockIcon, MapPinIcon, TagIcon } from '@heroicons/react/24/outline'
// import { formatTimestamp } from "../utils/formatTimestamp";

// export default function NoteCard({ note, onClick }: { note: Note; onClick?: () => void }) {
//   return (
//     <article
//       onClick={onClick}
//       className="flex gap-4 items-start p-4 rounded-lg bg-surface border border-white/6 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
//       style={{ minWidth: 0 }}
//     >
//       <div className="flex-shrink-0 bg-brand-600/90 p-3 rounded-md">
//         <ClipboardDocumentIcon className="w-6 h-6 text-white" />
//       </div>
//       <div className="min-w-0">
//         <div className="flex items-center justify-between gap-2">
//           <h3 className="font-semibold text-white truncate">{note.title || 'Untitled'}</h3>
//           <div className="text-sm text-white/60">{formatTimestamp(note.timestamp)}</div>
//         </div>
//         <p className="mt-2 text-sm text-white/80 line-clamp-3">{note.content}</p>
//         {note.tags && note.tags.length > 0 && (
//           <div className="mt-3 flex flex-wrap gap-2">
//             {note.tags.map((t) => (
//               <span key={t} className="inline-flex items-center gap-1 text-xs bg-white/6 text-white/90 px-2 py-1 rounded-full">
//                 <TagIcon className="w-4 h-4" />
//                 {t}
//               </span>
//             ))}
//           </div>
//         )}
//       </div>
//     </article>
//   );
// }

import type { Note } from "../types/Note";
import { ClipboardDocumentIcon, TagIcon } from "@heroicons/react/24/outline";
import { formatTimestamp } from "../utils/formatTimestamp";

export default function NoteCard({
  note,
  onClick,
}: {
  note: Note;
  onClick?: () => void;
}) {
  return (
    <article
      onClick={onClick}
      className="flex gap-4 items-start p-4 rounded-lg bg-surface border border-white/6 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
      style={{ minWidth: 0 }}
    >
      <div className="flex-shrink-0 bg-brand-600/90 p-3 rounded-md">
        <ClipboardDocumentIcon className="w-6 h-6 text-white" />
      </div>

      <div className="min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-white truncate">
            {note.title || "Untitled"}
          </h3>
          <div className="text-sm text-white/60">
            {formatTimestamp(note.timestamp)}
          </div>
        </div>

        <p className="mt-2 text-sm text-white/80 line-clamp-3">
          {note.content}
        </p>

        {note.tags && note.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {note.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 text-xs bg-white/6 text-white/90 px-2 py-1 rounded-full"
              >
                <TagIcon className="w-4 h-4" />
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}