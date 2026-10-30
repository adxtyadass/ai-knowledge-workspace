import SelectionGrid from "../components/home/selection-grid";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-full flex-col gap-10 bg-gradient-to-b from-background to-white p-6 lg:p-10">
      {/* Welcome header */}
      <div className="flex flex-col items-center justify-center pt-6">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          Workspace active
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-dark lg:text-5xl">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
            {user?.username || "User"}
          </span>
        </h2>
        <p className="mt-3 text-base text-muted">
          What would you like to work on today?
        </p>
      </div>

      {/* Selection grid */}
      <SelectionGrid />
    </div>
  );
}
