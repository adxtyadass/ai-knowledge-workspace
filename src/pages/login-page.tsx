import { useState } from "react";

export default function LoginPage() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  return (
    <div className="flex mt-10 mx-auto max-w-130 flex-col gap-6 items-center justify-center my-auto border border-gray-200 rounded-lg py-6">
      <div className="border-b border-secondary">AI<span className="text-primary font-bold">Knowledge</span> Workspace</div>
      <div>
        <label className="text-base font-medium">Username</label>{" "}
        <input
          type="text"
          value={data.username}
          name="username"
          onChange={(e) => setData({ ...data, username: e.target.value })}
          className="border border-gray-200 rounded-lg px-4 py-1"
        />
      </div>
      <div>
        <label className="text-base font-medium">Password</label>{" "}
        <input
          type="password"
          value={data.username}
          name="password"
          onChange={(e) => setData({ ...data, username: e.target.value })}
          className="border border-gray-200 rounded-lg px-4 py-1"
        />
      </div>
    </div>
  );
}
