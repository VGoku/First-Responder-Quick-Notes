/**
 * Navbar
 * ------
 * Simple top navigation bar for the app.
 * Displays the app title and provides consistent layout.
 */

export default function Navbar() {
  return (
    <nav
  className="
    w-full p-4 border-b
    bg-white text-black
    dark:bg-slate-900 dark:text-white
    border-black/10 dark:border-white/10
  "
>
  <h1 className="text-xl font-semibold">
    First Responder Quick Notes
  </h1>
</nav>
  );
}