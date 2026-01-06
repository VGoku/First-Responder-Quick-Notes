/**
 * Navbar
 * ------
 * Simple top navigation bar for the app.
 * Displays the app title and provides consistent layout.
 */

export default function Navbar() {
  return (
    <nav className="w-full bg-surface border-b border-white/10 p-4">
      <h1 className="text-xl font-semibold text-white">
        First Responder Quick Notes
      </h1>
    </nav>
  );
}