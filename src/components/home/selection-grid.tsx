import { ChecksIcon, FilesIcon, NotchesIcon, NotebookIcon, OpenAiLogoIcon, UsersThreeIcon } from "@phosphor-icons/react";
import type { ElementType } from "react";
import { Link } from "react-router-dom";

interface SelectionGridItem {
    title: string;
    description: string;
    icon: ElementType;
    url?: string;
    color: string;
}

const selectionGridItems: SelectionGridItem[] = [
  {
    title: "Daily Tasks",
    description: "Track and manage your everyday to-dos",
    icon: ChecksIcon,
    url: '/daily-task',
    color: "text-emerald-500 bg-emerald-50",
  },
  {
    title: "Ask AI Agent",
    description: "Get instant answers from your AI assistant",
    icon: OpenAiLogoIcon,
    color: "text-violet-500 bg-violet-50",
  },
  {
    title: "Documents",
    description: "Organize and manage all your files",
    icon: FilesIcon,
    color: "text-blue-500 bg-blue-50",
  },
  {
    title: "Notes",
    description: "Quick notes and knowledge snippets",
    icon: NotebookIcon,
    color: "text-amber-500 bg-amber-50",
  },
  {
    title: "Directory",
    description: "Browse your working directory tree",
    icon: NotchesIcon,
    color: "text-cyan-500 bg-cyan-50",
  },
  {
    title: "Collaborate",
    description: "Work together with your team in real time",
    icon: UsersThreeIcon,
    color: "text-rose-500 bg-rose-50",
  },
];

export default function SelectionGrid() {
    return (
      <div className="container mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {selectionGridItems.map((item, index) => (
            <Link
              to={item?.url ? item?.url : "#"}
              key={index}
              className="group relative flex flex-col gap-3 rounded-2xl border border-slate-200/60 bg-white/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-white hover:shadow-lg hover:shadow-primary/5"
            >
                <div className={`flex size-11 items-center justify-center rounded-xl ${item.color} transition-transform group-hover:scale-110`}>
                  <item.icon className="size-5" weight="duotone" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-dark">{item.title}</h3>
                  <p className="mt-0.5 text-sm text-muted">{item.description}</p>
                </div>
            </Link>
        ))}
      </div>
    );
}
