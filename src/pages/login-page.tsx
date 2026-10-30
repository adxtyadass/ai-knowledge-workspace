import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../components/ui/input";
import { useAuth } from "../context/AuthContext";
import { SpinnerGapIcon } from "@phosphor-icons/react";

export default function LoginPage() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect away from login page
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(data.username, data.password);
      navigate("/home", { replace: true });
    } catch {
      setError("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 px-4">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/4 size-96 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute -right-32 bottom-1/4 size-96 rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-white/60 bg-white/70 p-8 shadow-xl shadow-black/5 backdrop-blur-xl">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-lg shadow-primary/25">
              AI
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-dark">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-muted">
              Sign in to your workspace
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              label="Username"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={data.username}
              onChange={(e) =>
                setData({ ...data, username: e.target.value })
              }
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
            />

            {error && (
              <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/20 transition-all hover:bg-primary-hover hover:shadow-md hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <SpinnerGapIcon className="size-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-muted">Demo credentials</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setData({ username: "admin", password: "admin" })}
              className="flex-1 cursor-pointer rounded-lg border border-slate-200 bg-white/80 py-2 text-xs font-medium text-muted transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              admin / admin
            </button>
            <button
              type="button"
              onClick={() => setData({ username: "demo", password: "demo" })}
              className="flex-1 cursor-pointer rounded-lg border border-slate-200 bg-white/80 py-2 text-xs font-medium text-muted transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              demo / demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
