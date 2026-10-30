import { ListIcon, SignOutIcon, UserCircleIcon } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface IProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: IProps) {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-white/70 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        {isAuthenticated && onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-slate-100 hover:text-dark"
            aria-label="Toggle sidebar"
          >
            <ListIcon className="size-5" weight="bold" />
          </button>
        )}

        <Link to="/" className="flex items-center gap-1.5 select-none">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white">
            AI
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-dark">
            Knowledge
            <span className="font-normal text-muted"> Workspace</span>
          </span>
        </Link>
      </div>

      {isAuthenticated ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2.5 rounded-xl border border-slate-200/60 bg-white/50 px-3 py-1.5 backdrop-blur-sm">
            <UserCircleIcon className="size-7 text-primary" weight="duotone" />
            <span className="text-sm font-medium text-dark">{user?.username}</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-muted transition-all hover:bg-red-50 hover:text-red-500"
            aria-label="Logout"
          >
            <SignOutIcon className="size-4.5" weight="bold" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-dark"
          >
            Sign in
          </Link>

          <Link
            to="/login"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm shadow-primary/20 transition-all hover:bg-primary-hover hover:shadow-md hover:shadow-primary/25 active:scale-[0.97]"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
