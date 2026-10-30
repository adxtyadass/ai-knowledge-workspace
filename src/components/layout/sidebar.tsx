import { Link, useLocation } from "react-router-dom";
import { sideBarItems } from "../../common/data";

export default function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const location = useLocation();

  return (
    <aside
      className={`${
        isSidebarOpen ? "w-56" : "w-0"
      } flex flex-col gap-1 overflow-hidden border-r border-slate-200/60 bg-slate-50/50 px-0 pt-2 backdrop-blur-sm transition-[width] duration-300 ease-in-out ${
        isSidebarOpen ? "px-3" : ""
      }`}
    >
      {sideBarItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;

        return (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all ${
              isActive
                ? "bg-primary/10 text-primary shadow-sm"
                : "text-muted hover:bg-slate-100 hover:text-dark"
            }`}
          >
            <Icon
              className={`size-[18px] shrink-0 ${
                isActive ? "text-primary" : ""
              }`}
              weight={isActive ? "fill" : "regular"}
            />
            <span className="whitespace-nowrap">{item.label}</span>
          </Link>
        );
      })}
    </aside>
  );
}
