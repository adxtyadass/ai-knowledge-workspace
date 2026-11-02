import { PlusIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Modal from "../components/ui/modal";
import AddDailyTask from "../components/daily-tasks/add-form";
import type { Task } from "../types/types";
import TasksGrid from "../components/daily-tasks/tasks-grid";

export default function DailyTasksPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  const handleCreateTask = (newTask: Task) => {
    setSelectedTask(null)
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  const handleToggle = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  const handleDelete = (id: string) => {
    setDeleteTaskId(id);
    setOpenDeleteModal(true);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prev) => prev.map((task) => task?.id === updatedTask.id ? { ...task, ...updatedTask } : task));
  }

  const handleEdit = (id: string) => {
    const taskToEdit = tasks.find((task) => task.id === id);

    if (!taskToEdit) return;

    setSelectedTask(taskToEdit);
    setIsOpen(true);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
        <TasksGrid onDelete={handleDelete} onEdit={handleEdit} tasks={tasks} handleToggle={handleToggle} />)
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
        heading={selectedTask ? "Edit task" : "Create new task"}
        onClose={() => {
          setIsOpen(false);
          setSelectedTask(null)
        }}
        isOpen={isOpen}
        children={
          <AddDailyTask initialData={selectedTask} handleSubmit={(newTask) => {
            if (selectedTask) {
              handleUpdateTask(newTask);
            } else {
              handleCreateTask(newTask);
            };
            setIsOpen(false);
          }} handleCancel={() => {setIsOpen(false);
            setSelectedTask(null)
          }} />
        }
      />
      <Modal heading="Delete this task" isOpen={openDeleteModal} onClose={() => setOpenDeleteModal(false)}  children={
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-sm text-muted">Are you sure you want to delete this task? This action cannot be undone.</p>
          <div className="flex gap-3">
            <button onClick={() => setOpenDeleteModal(false)} className="cursor-pointer px-4 py-2 rounded-lg bg-slate-100 text-sm font-medium text-muted hover:bg-slate-200 transition-all">Cancel</button>
            <button
              onClick={() => {
                if (!deleteTaskId) return;

                setTasks((prev) =>
                  prev.filter((task) => task.id !== deleteTaskId)
                );

                setOpenDeleteModal(false);
                setDeleteTaskId(null);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      }/>
    </div>
  );
}
