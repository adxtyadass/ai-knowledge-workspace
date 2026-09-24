export default function DailyTasksPage() {
    return(
        <div className="flex flex-col gap-8 bg-gray-100 p-4 min-h-screen">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-dark text-5xl mt-9 font-medium tracking-tight">
                    Daily Tasks
                </h2>
                <p className="text-gray-500 mt-4 text-lg italic">Manage your daily tasks here.</p>
            </div>
        </div>
    )
}