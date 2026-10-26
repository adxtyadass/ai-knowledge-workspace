
import { ListIcon, SignOutIcon, UserCircleIcon } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface IProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: IProps) {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-md px-6 py-4">
      <h2 className="flex items-center gap-2 text-black font-semibold">
        {isAuthenticated && onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="cursor-pointer hover:opacity-90"
            aria-label="Toggle sidebar"
          >
            <ListIcon />
          </button>
        )}

        <Link to="/" className="select-none">
          AI<span className="text-primary font-bold">Knowledge</span> Workspace
        </Link>
      </h2>

      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <UserCircleIcon className="size-8 text-black" />

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-gray-200 p-2 cursor-pointer text-sm font-medium text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <SignOutIcon size={18} />
            {/* Logout */}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg px-5 py-2 text-sm font-medium text-jet-black transition hover:text-primary"
          >
            Sign in
          </Link>

          <Link
            to="/login"
            className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90 active:scale-[0.97]"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
