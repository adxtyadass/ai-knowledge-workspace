import { useState } from "react";
import type { Task } from "../../types/types";
import Input from "../ui/input";
import Select from "../ui/select";

interface AddDailyTaskProps {
    handleCancel: () => void;
    handleSubmit: (data: Task) => void;
}

export default function AddDailyTask({ handleCancel, handleSubmit }: AddDailyTaskProps) {
    const [data, setData] = useState<Task>({
        id: "",
        title: "",
        priority: "low",
        dueDate: "",
        description: "",
        completed: false,
        createdAt: "",
    })

    const handleChange = (
        field: "title" | "priority" | "dueDate" | "description",
        value: string
    ) => {
        setData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const onSubmit = () => {
        const newTask: Task = {
            ...data,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        };

        handleSubmit(newTask);
    };

    const isValid =
        data.title.trim() &&
        data.priority &&
        data.dueDate &&
        data.description.trim();

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <Input
                    type="text"
                    label="Task name"
                    name="title"
                    placeholder="Enter task name"
                    value={data?.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                />
                <Select label="Priority" value={data?.priority} name="priority"
                    onChange={(e) => handleChange('priority', e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </Select>
                <Input label="Due date" type="date" name="dueDate" value={data?.dueDate}
                    onChange={(e) => handleChange('dueDate', e.target.value)}
                />
                <Input
                    type="textarea"
                    label="Description"
                    name="description"
                    value={data?.description}
                    placeholder="Enter task description"
                    onChange={(e) => handleChange('description', e.target.value)}
                />
            </div>
            <div className="mt-5 flex items-center gap-3">
                <button
                    onClick={handleCancel}
                    className="flex-1 cursor-pointer rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-muted transition-all hover:border-slate-300 hover:text-dark"
                >
                    Cancel
                </button>
                <button
                    disabled={!isValid}
                    onClick={onSubmit}
                    type="button"
                    className="flex-1 cursor-pointer rounded-lg bg-primary py-2.5 text-sm font-medium text-white shadow-sm shadow-primary/20 transition-all
               hover:bg-primary-hover hover:shadow-md active:scale-[0.98]
               disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:bg-primary disabled:hover:shadow-none disabled:active:scale-100"
                >
                    Create Task
                </button>
            </div>
        </>
    )
}