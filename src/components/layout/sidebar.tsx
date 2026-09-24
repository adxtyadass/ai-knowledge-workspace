
import { Link } from "react-router-dom";
import { sideBarItems } from "../../common/data";


export default function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  return (
    <aside
      className={`${
        isSidebarOpen ? "w-54" : "w-0"
      } bg-white h-screen overflow-hidden transform transition-[width] ease-in-out duration-250 border-r border-gray-200`}
    >
      {sideBarItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            to={item.href}
            className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100"
          >
            <Icon className="size-5 text-green-600 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </aside>
  );
}
