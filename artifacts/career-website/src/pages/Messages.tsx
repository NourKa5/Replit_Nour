import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Inbox, Loader2, RefreshCw, Lock, Eye, EyeOff } from "lucide-react";

const SESSION_KEY = "nk_admin_auth";
const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

function useAdminMessages(password: string | null) {
  const [data, setData] = useState<Message[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch_ = async () => {
    if (!password) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/contact/messages`, {
        headers: { "x-admin-password": password },
      });
      if (res.status === 401) {
        setError("wrong_password");
        return;
      }
      if (!res.ok) throw new Error("Server error");
      const json = await res.json();
      setData(json);
    } catch {
      setError("network_error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch_(); }, [password]);

  return { data, loading, error, refetch: fetch_ };
}

export default function Messages() {
  const [inputPassword, setInputPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [savedPassword, setSavedPassword] = useState<string | null>(() =>
    sessionStorage.getItem(SESSION_KEY)
  );
  const [authError, setAuthError] = useState(false);

  const { data: messages, loading, error, refetch } = useAdminMessages(savedPassword);

  // If the API returns 401, clear saved password
  useEffect(() => {
    if (error === "wrong_password") {
      sessionStorage.removeItem(SESSION_KEY);
      setSavedPassword(null);
      setAuthError(true);
    }
  }, [error]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(false);
    // Verify password against the API before saving
    try {
      const res = await fetch(`${API_BASE}/api/contact/messages`, {
        headers: { "x-admin-password": inputPassword },
      });
      if (res.status === 401) {
        setAuthError(true);
        return;
      }
      sessionStorage.setItem(SESSION_KEY, inputPassword);
      setSavedPassword(inputPassword);
      setInputPassword("");
    } catch {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setSavedPassword(null);
    setInputPassword("");
  };

  if (!savedPassword) {
    return (
      <div className="min-h-screen bg-[#0B0B08] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto bg-[#141410] border border-[#2A2A1E] rounded-2xl flex items-center justify-center text-amber-400 mb-4">
              <Lock size={24} />
            </div>
            <h1 className="text-xl font-bold text-[#F5F0E0]">Admin Access</h1>
            <p className="text-sm text-[#9A9A80] mt-1">Enter your admin password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={inputPassword}
                onChange={(e) => { setInputPassword(e.target.value); setAuthError(false); }}
                placeholder="Password"
                autoFocus
                className={`w-full px-4 py-3 pr-11 bg-[#141410] border rounded-xl text-[#F5F0E0] placeholder-[#9A9A80] outline-none transition-colors text-sm ${
                  authError
                    ? "border-red-500/60 focus:border-red-400"
                    : "border-[#2A2A1E] focus:border-amber-400/60"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9A80] hover:text-[#F5F0E0] transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {authError && (
              <p className="text-xs text-red-400 text-center">Incorrect password. Try again.</p>
            )}

            <button
              type="submit"
              disabled={!inputPassword}
              className="w-full py-3 bg-amber-400 text-[#0B0B08] font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B08]">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-[#F5F0E0]">Inbox</h1>
            <p className="text-[#9A9A80] mt-1 text-sm">Contact requests from your portfolio</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => refetch()}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-[#141410] border border-[#2A2A1E] text-[#9A9A80] rounded-xl hover:border-amber-400/40 hover:text-amber-400 transition-all disabled:opacity-50 text-sm font-medium"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-[#9A9A80] border border-[#2A2A1E] rounded-xl hover:border-red-400/40 hover:text-red-400 transition-all text-sm font-medium"
            >
              <Lock size={14} />
              Lock
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#141410] rounded-2xl border border-[#2A2A1E]">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin mb-4" />
            <p className="text-[#9A9A80] text-sm">Loading messages...</p>
          </div>
        ) : error && error !== "wrong_password" ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl text-sm">
            Could not connect to the server. Make sure the API is running.
          </div>
        ) : !messages || messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-[#141410] rounded-2xl border border-[#2A2A1E] text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#1E1E18] flex items-center justify-center text-[#3A3A2E] mb-4">
              <Inbox size={28} />
            </div>
            <h3 className="text-lg font-bold text-[#F5F0E0] mb-2">Inbox is empty</h3>
            <p className="text-[#9A9A80] max-w-sm text-sm">When someone fills out the contact form, their message will appear here.</p>
          </div>
        ) : (
          <div className="bg-[#141410] border border-[#2A2A1E] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#2A2A1E] bg-[#1A1A14]">
                    <th className="py-3.5 px-5 font-semibold text-[#9A9A80] text-xs uppercase tracking-wider">Date</th>
                    <th className="py-3.5 px-5 font-semibold text-[#9A9A80] text-xs uppercase tracking-wider">Sender</th>
                    <th className="py-3.5 px-5 font-semibold text-[#9A9A80] text-xs uppercase tracking-wider">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2A1E]">
                  {messages.map((msg) => (
                    <tr key={msg.id} className="hover:bg-[#1A1A14] transition-colors">
                      <td className="py-4 px-5 text-xs text-[#9A9A80] whitespace-nowrap align-top">
                        {new Date(msg.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-4 px-5 align-top">
                        <div className="font-semibold text-[#F5F0E0] text-sm">{msg.name}</div>
                        <a href={`mailto:${msg.email}`} className="text-xs text-amber-400 hover:underline">
                          {msg.email}
                        </a>
                      </td>
                      <td className="py-4 px-5 text-[#9A9A80] text-sm max-w-xl">
                        <p className="whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
