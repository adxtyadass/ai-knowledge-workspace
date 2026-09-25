// const tasks = [
//     {
//         id: 1,
//         title: "Task 1",
//         description: "This is the first task.",
//         completed: false,
//     },
//     {
//         id: 2,
//         title: "Task 2",
//         description: "This is the second task.",
//         completed: true,
//     },
//     {
//         id: 3,
//         title: "Task 3",
//         description: "This is the third task.",
//         completed: false,
//     }
// ]

import { PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";
import Modal from "../components/ui/modal";

export default function DailyTasksPage() {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="flex flex-col gap-8 bg-gray-100 p-4 min-h-screen">
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-4 mt-9">
            <h2 className="text-dark text-5xl font-medium tracking-tight">
              Daily Tasks
            </h2>
            <button
              onClick={() => setIsOpen(true)}
              title="Add your task"
              className="cursor-pointer hover:bg-primary/10 hover:border-secondary hover:border text-primary bg-primary/20 rounded-full px-4"
            >
              <PlusIcon className="size-5 text-secondary" />
            </button>
          </div>
          <p className="text-gray-500 mt-4 text-lg italic">
            Manage your daily tasks here.
          </p>
        </div>
        <Modal
          heading="Add your task here"
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
          children={
            <>
              <div className="grid grid-cols-2 gap-5 px-4 py-2 text-base">
                <div className="">
                  <label className="block mb-2 font-medium text-gray-900">
                    Task Name
                  </label>
                  <input
                    className="border border-gray-200 px-2 rounded-md"
                    placeholder="Enter task name"
                    type="text"
                  />
                </div>
                <div className="">
                  <label className="block mb-2 font-medium text-gray-900">
                    Priority
                  </label>
                  <select className="w-full border border-gray-200 px-2 rounded-md">
                    <option value={"low"}>Low</option>
                    <option value={"medium"}>Medium</option>
                    <option value={"high"}>High</option>
                  </select>
                </div>
                <div className="">
                  <label className="block mb-2 font-medium text-gray-900">
                    Due Date
                  </label>
                  <input
                    className="w-full border border-gray-200 px-2 rounded-md"
                    type="date"
                  />
                </div>
                <div className="">
                  <label className="block mb-2 font-medium text-gray-900">
                    Category
                  </label>
                  <input
                    className="w-full border border-gray-200 px-2 rounded-md"
                    type="textarea"
                    placeholder="Description..."
                  />
                </div>
              </div>
              <div className="flex mt-5 justify-center px-4 gap-3 items-center w-full">
                <button onClick={() => setIsOpen(false)} className="w-full hover:bg-red-50 cursor-pointer py-2 font-medium border border-red-500 rounded-md text-red-500 px-4">
                  Cancel
                </button>
                <button className="w-full cursor-pointer py-2 font-medium bg-primary/60 rounded-md text-white px-4">
                  Submit
                </button>
              </div>
            </>
          }
        />
      </div>
    );
}