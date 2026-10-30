import { PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";
import Modal from "../components/ui/modal";
import AddDailyTask from "../components/daily-tasks/add-form";
import type { Task } from "../types/types";
import TasksGrid from "../components/daily-tasks/tasks-grid";

export default function DailyTasksPage() {
    const [isOpen, setIsOpen] = useState(false)
    const [tasks, setTasks] = useState<Task[]>([]);

    const handleCreateTask = (newTask: Task) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    const handleToggle = (id: string) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    }

    const handleEdit = (id: string) => {
      setTasks((prev) => prev.map((task) => task.id === id ? {...task, id: task.id, description: task.description, title: task.title} : task))
      setIsOpen(true)
    }

    return (
      <div className="flex min-h-full flex-col gap-8 bg-linear-to-b from-background to-white p-6 lg:p-10">
        {/* Header */}
        <div className="flex flex-col items-center justify-center pt-6">
          <div className="flex items-center gap-3">
            <h2 className="text-4xl font-bold tracking-tight text-dark">
              Daily Tasks
            </h2>
            <button
              onClick={() => setIsOpen(true)}
              title="Add your task"
              className="flex size-10 cursor-pointer items-center justify-center rounded-xl bg-primary text-white shadow-sm shadow-primary/20 transition-all hover:bg-primary-hover hover:shadow-md hover:shadow-primary/25 active:scale-95"
            >
              <PlusIcon className="size-5" weight="bold" />
            </button>
          </div>
          <p className="mt-3 text-base text-muted">
            Manage your daily tasks here.
          </p>
        </div>

        {/* Empty state */}
        {tasks.length ? (
          <TasksGrid onEdit={handleEdit} tasks={tasks} handleToggle={handleToggle}/>)
        : 
        <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/50 px-8 py-16 text-center backdrop-blur-sm">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-slate-100">
            <PlusIcon className="size-7 text-muted" />
          </div>
          <h3 className="text-[15px] font-semibold text-dark">No tasks yet</h3>
          <p className="mt-1 text-sm text-muted">
            Create your first task to get started
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="mt-5 cursor-pointer rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white shadow-sm shadow-primary/20 transition-all hover:bg-primary-hover hover:shadow-md active:scale-[0.97]"
          >
            Add Task
          </button>
        </div>}

        {/* Modal */}
        <Modal
          heading="Create new task"
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
          children={
           <AddDailyTask handleSubmit={(newTask) => {
            handleCreateTask(newTask);
            setIsOpen(false);
           } } handleCancel={() => setIsOpen(false)}/> 
          }
        />
      </div>
    );
}
