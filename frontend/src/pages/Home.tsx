/**
 * Home Page
 * ---------
 * This is the landing screen for the app. It will eventually
 * show recent notes, quick actions, and navigation to create
 * a new note. For now, it provides a clean placeholder layout
 * that matches the app's dark theme and design system.
 */

export default function Home() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <main className="px-6 py-10 max-w-3xl w-full text-white">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Quick Notes for First Responders
        </h1>

        <p className="text-lg text-gray-300 mb-8">
          Capture vital info fast — timestamp, location, and tags.
        </p>

        <button className="bg-brand-500 hover:bg-brand-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition-transform transform hover:scale-105">
          + Create New Note
        </button>

        <div className="mt-12 text-center text-gray-500">
          No notes yet — ready when you are.
        </div>
      </main>
    </div>
  );
}