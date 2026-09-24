import { ArrowCounterClockwiseIcon, ListIcon } from "@phosphor-icons/react";

interface IProps{
    sidebarOpen?: boolean;
    onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: IProps) {
  return (
    <nav className="bg-white flex justify-between items-center border-b border-gray-200 p-4">
      <h2 className="flex items-center gap-2 text-black font-semibold">
        <button
          onClick={onToggleSidebar}
          className="cursor-pointer hover:opacity-90"
        >
          <ListIcon />
        </button>
        AI <span className="text-green-600 font-bold">Knowledge</span> Workspace
      </h2>
      <span className="border border-gray-200 rounded-full p-3 cursor-pointer hover:opacity-90">
        <ArrowCounterClockwiseIcon className="text-black" />
      </span>
    </nav>
  );
}