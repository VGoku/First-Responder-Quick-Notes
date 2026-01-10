interface EMTDashboardProps {
  onStart: () => void;
  onContinue: () => void;
  onView: () => void;
}

export default function EMTDashboard({
  onStart,
  onContinue,
  onView,
}: EMTDashboardProps) {
  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        EMT Dashboard
      </h1>

      <button
        onClick={onStart}
        className="w-full max-w-md bg-brand-500 hover:bg-brand-600 text-white text-xl py-4 rounded-lg shadow transition-all hover:scale-105"
      >
        🚑 Start New Incident
      </button>

      <button
        onClick={onContinue}
        className="w-full max-w-md bg-slate-700 hover:bg-slate-600 text-white text-xl py-4 rounded-lg shadow transition-all hover:scale-105"
      >
        📄 Continue Last Incident
      </button>

      <button
        onClick={onView}
        className="w-full max-w-md bg-slate-800 hover:bg-slate-700 text-white text-xl py-4 rounded-lg shadow transition-all hover:scale-105"
      >
        📁 View Saved Incidents
      </button>
    </div>
  );
}