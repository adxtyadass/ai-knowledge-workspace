import { ChecksIcon, FilesIcon, NotchesIcon, NotebookIcon, OpenAiLogoIcon, UsersThreeIcon } from "@phosphor-icons/react";
import type { ElementType } from "react";

interface SelectionGridItem {
    title: string;
    icon: ElementType;
}
const selectionGridItems: SelectionGridItem[] = [
  {
    title: "Add Daily Tasks",
    icon: ChecksIcon,
  },
  {
    title: "Ask Your agent",
    icon: OpenAiLogoIcon,
  },
  {
    title: "Manage documents",
    icon: FilesIcon,
  },
  {
    title: "Manage notes",
    icon: NotebookIcon,
  },
  {
    title: "Working directory",
    icon: NotchesIcon,
  },
  {
    title: "Collaborate with team",
    icon: UsersThreeIcon,
  },
];

export default function SelectionGrid() {
    return (
      <div className="container mx-auto grid lg:grid-cols-3 grid-cols-1 gap-8">
        {selectionGridItems.map((item, index) => (
            <button key={index} className="px-4 py-6 min-h-60 border border-gray-300 rounded-xl cursor-pointer flex flex-col items-center justify-center gap-2 hover:bg-primary/10 hover:border-primary transform transition hover:scale-105">
                <item.icon className="size-8 text-gray-500" />
                <span className="text-gray-700">{item.title}</span>
            </button>
        ))}
      </div>
    );
}