import { useState } from "react";
import Input from "../components/ui/input";

export default function LoginPage() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  return (
    <>
      <div className="flex mt-10 mx-auto max-w-130 flex-col gap-6 items-center justify-center my-auto border border-gray-200 rounded-lg py-6">
        <div className="border-b border-secondary">
          AI<span className="text-primary font-bold">Knowledge</span> Workspace
        </div>
        <Input
          label="Username"
          type="text"
          value={data.username}
          name="username"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        <Input
          label="Password"
          type="password"
          value={data.password}
          name="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button className="w-full mx-auto max-w-70 cursor-pointer hover:opacity-90 bg-primary text-white px-4 py-2 rounded-lg">
          Login
        </button>
      </div>
    </>
  );
}
