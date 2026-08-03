import { useState } from "react";
import { supabase } from "../lib/supabase";
import { LogIn, Loader2, Lock, UserPlus } from "lucide-react";

type Mode = "signin" | "signup";

export default function AdminLogin() {
  const [email, setEmail] = useState("synaryverse@gmail.com");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<Mode>("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [needsEmailConfirm, setNeedsEmailConfirm] = useState(false);
  const [rateLimitHit, setRateLimitHit] = useState(false);

  const dashboardUsersUrl =
    "https://supabase.com/dashboard/project/mswvipiyvujlpsuudzny/auth/users";

  const handleResendConfirmation = async () => {
    if (!supabase || !email || rateLimitHit) return;

    setLoading(true);
    setError("");
    setInfo("");

    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    if (resendError) {
      if (resendError.message.toLowerCase().includes("rate limit")) {
        setRateLimitHit(true);
        setNeedsEmailConfirm(true);
        setError(
          "Bahut saari emails bhej di gayi hain — ab email resend nahi hoga. Supabase Dashboard se user manually confirm karo (link neeche)."
        );
      } else {
        setError(resendError.message);
      }
    } else {
      setInfo(`Confirmation email bhej di gayi: ${email}. Gmail inbox/spam check karo, link pe click karo, phir Sign In karo.`);
    }

    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env");
      return;
    }

    setLoading(true);
    setError("");
    setInfo("");
    setNeedsEmailConfirm(false);

    if (mode === "signin") {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        if (authError.message.toLowerCase().includes("email not confirmed")) {
          setNeedsEmailConfirm(true);
          setError(
            "Email confirm nahi hui. Resend mat dabao bar bar — Supabase Dashboard se Confirm user karo."
          );
        } else if (authError.message.toLowerCase().includes("invalid login credentials")) {
          setError("Invalid login credentials. Account nahi bana? Neeche 'Create Admin Account' try karo.");
        } else {
          setError(authError.message);
        }
      }
    } else {
      const { data, error: authError } = await supabase.auth.signUp({ email, password });

      if (authError) {
        setError(authError.message);
      } else if (data.session) {
        setInfo("Account created. Logging you in...");
      } else {
        setInfo(
          "Account created. Agar login na ho to Supabase Dashboard -> Authentication -> Users mein jao aur user ko Confirm karo, ya Email confirmation band karo."
        );
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#c1eb40]/10 border border-[#c1eb40]/30 mb-4">
            <Lock className="text-[#c1eb40]" size={28} />
          </div>
          <h1 className="text-3xl font-black text-white">Snapycut Admin</h1>
          <p className="text-neutral-500 text-sm mt-2">Sign in to manage your website content</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111] border border-neutral-800 rounded-2xl p-8 space-y-5">
          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c1eb40] transition-colors"
              placeholder="admin@snapycut.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c1eb40] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {info && (
            <div className="bg-[#c1eb40]/10 border border-[#c1eb40]/30 rounded-lg px-4 py-3 text-[#c1eb40] text-sm">
              {info}
            </div>
          )}

          {needsEmailConfirm && (
            <a
              href={dashboardUsersUrl}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center text-sm font-semibold text-black bg-[#c1eb40] rounded-lg py-2.5 hover:bg-[#aed83a] transition-colors"
            >
              Open Supabase → Confirm User
            </a>
          )}

          {needsEmailConfirm && !rateLimitHit && (
            <button
              type="button"
              onClick={handleResendConfirmation}
              disabled={loading}
              className="w-full text-sm font-semibold text-[#c1eb40] border border-[#c1eb40]/40 rounded-lg py-2.5 hover:bg-[#c1eb40]/10 transition-colors disabled:opacity-50"
            >
              Resend Confirmation Email
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#c1eb40] text-black font-bold py-3 rounded-lg hover:bg-[#aed83a] transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : mode === "signin" ? (
              <LogIn size={18} />
            ) : (
              <UserPlus size={18} />
            )}
            {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Admin Account"}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError("");
              setInfo("");
              setNeedsEmailConfirm(false);
              setRateLimitHit(false);
            }}
            className="w-full text-neutral-500 text-sm hover:text-[#c1eb40] transition-colors"
          >
            {mode === "signin"
              ? "Pehli dafa? Create Admin Account"
              : "Already have account? Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
