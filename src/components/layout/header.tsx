import { ListIcon, UserCircleIcon } from "@phosphor-icons/react";

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
        <div>
        AI<span className="text-primary font-bold">Knowledge</span> Workspace</div>
      </h2>
      <span className="cursor-pointer hover:opacity-90">
        <UserCircleIcon className="size-8 text-black" />
      </span>
    </nav>
  );
}