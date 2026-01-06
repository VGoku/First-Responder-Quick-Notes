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
    <main className="p-6 text-white bg-bg min-h-screen">
      <h1 className="text-3xl font-bold">Home</h1>

      <p className="mt-4 text-white/70">
        Welcome to First Responder Quick Notes. Your recent notes and quick
        actions will appear here.
      </p>
    </main>
  );
}