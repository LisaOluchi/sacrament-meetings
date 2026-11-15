'use client';

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded bg-blue-900 px-4 py-2 text-white hover:bg-blue-800 print:hidden"
    >
      Print program
    </button>
  );
}
