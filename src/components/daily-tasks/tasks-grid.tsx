import { CheckIcon } from "@phosphor-icons/react";
import type { Task } from "../../types/types";

export default function TasksGrid({ tasks, handleToggle, onEdit }: { tasks: Task[], handleToggle: (taskId: string) => void, onEdit: (taskId: string) => void }) {
    return (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
            {tasks?.map((task) =>
                <div className="relative" key={task.id}>
                    <button
                        title="Mark as completed"
                        onClick={() => handleToggle(task.id)}
                        className={`z-1 absolute -left-3 -top-3 flex size-7 cursor-pointer items-center justify-center rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            task.completed
                                ? "border-green-400 bg-green-400"
                                : "border-slate-300 bg-white hover:border-green-400"
                        }`}
                    >
                        {task.completed && <CheckIcon className="size-4 text-white" weight="bold" />}
                    </button>
                    <div className={`flex flex-col gap-2 rounded-lg border border-slate-200 ${task.completed ? 'bg-green-200 opacity-50' : 'bg-white/50'} p-4 backdrop-blur-sm`} >
                        <div className="flex items-center justify-between gap-2">
                            <h3 className={`text-base font-medium ${task.completed ? 'text-dark' : 'text-primary'}`}>{task.title}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${task.priority === 'low' ? 'bg-green-100 text-green-800' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                {task.priority}
                            </span>
                        </div>
                        <div className={`text-sm ${task.completed ? 'text-dark' : 'text-muted'}`}>
                        {task.dueDate && <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
                        {task.description && <p>{task.description}</p>}
                        </div>
                        <div className="flex items-center justify-end gap-2 w-full">
                            <button onClick={() => onEdit(task.id)} className="px-2 py-0.5 text-sm bg-gray-100 cursor-pointer rounded hover:bg-gray-200 transition-all">
                                Edit
                            </button>
                            <button className="px-2 py-0.5 text-sm bg-red100 border border-red-600 text-red-700 cursor-pointer rounded hover:bg-red-200 transition-all">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>)}
        </div>
    )
}
