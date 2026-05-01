import React from "react";

const ADMIN_PIN = "1234";
const SESSION_KEY = "nindaford_admin_auth";

/**
 * PIN gate — prompts for a 4-digit PIN before granting access to the admin panel.
 * Stores auth state in sessionStorage so refreshing doesn't require re-entry.
 */
export function AdminGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = React.useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [pin, setPin] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
      setPin("");
    }
  };

  if (authed) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5"
      >
        <h1 className="text-xl font-bold text-zinc-900 text-center mb-2">
          🔒 Admin Access
        </h1>
        <p className="text-sm text-zinc-500 text-center mb-6">
          กรุณาใส่ PIN เพื่อเข้าจัดการโปรโมชั่น
        </p>

        <input
          type="password"
          maxLength={4}
          inputMode="numeric"
          pattern="[0-9]*"
          value={pin}
          onChange={(e) => {
            setPin(e.target.value.replace(/\D/g, ""));
            setError(false);
          }}
          placeholder="••••"
          className={
            "w-full rounded-xl border px-4 py-3 text-center text-2xl tracking-[0.5em] font-mono outline-none transition-colors " +
            (error
              ? "border-red-400 bg-red-50 focus:ring-red-300"
              : "border-zinc-200 bg-zinc-50 focus:ring-blue-300") +
            " focus:ring-2"
          }
          autoFocus
        />

        {error && (
          <p className="mt-2 text-sm text-red-500 text-center">
            PIN ไม่ถูกต้อง กรุณาลองใหม่
          </p>
        )}

        <button
          type="submit"
          disabled={pin.length < 4}
          className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          เข้าสู่ระบบ
        </button>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = "";
          }}
          className="mt-4 block text-center text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          ← กลับหน้าหลัก
        </a>
      </form>
    </div>
  );
}
