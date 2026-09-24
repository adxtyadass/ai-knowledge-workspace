import SelectionGrid from "../components/home/selection-grid";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 bg-gray-100 p-4 min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-dark text-5xl mt-9 font-medium tracking-tight">
          Welcome to <span  className="text-primary">your</span> workspace...
        </h2>
        <p className="text-gray-500 mt-4 text-lg italic">What would you like to do?</p>
      </div>
      <SelectionGrid/>
    </div>
  );
}
