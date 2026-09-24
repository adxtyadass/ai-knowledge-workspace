import { useRef, useState } from "react";
import Modal from "../components/ui/modal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLButtonElement | null>(null);
  return (
    <div className="bg-gray-100 p-4 h-full" >
      <h2 className="text-gray-500">This is the Home page</h2>

      <button ref={ref} onClick={() => {
        setIsOpen(true)
        }} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200 cursor-pointer">
        Open Modal
      </button>
      <Modal refCheck={ref} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex items-center justify-center">

          <h2 className="text-green-500">This is a modal</h2>
        </div>
      </Modal>
    </div>
  );
}
