
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../components/ui/input";
import { useAuth } from "../context/AuthContext";

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
    <div className="pt-30 min-h-screen w-full bg-gray-100">
    <form
      onSubmit={handleSubmit}
      className="flex mx-auto bg-white max-w-130 flex-col gap-6 items-center justify-center my-auto border border-gray-200 rounded-lg py-6"
    >
      <div className="border-b border-secondary">
        AI<span className="text-primary font-bold">Knowledge</span> Workspace
      </div>

      <Input
        label="Username"
        type="text"
        name="username"
        value={data.username}
        onChange={(e) =>
          setData({ ...data, username: e.target.value })
        }
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mx-auto max-w-70 cursor-pointer hover:opacity-90 disabled:opacity-60 bg-primary text-white px-4 py-2 rounded-lg"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      <p className="text-sm text-gray-500">
        Demo: admin/admin or demo/demo
      </p>
    </form></div>
  );
}
