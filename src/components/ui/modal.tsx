import { X } from "@phosphor-icons/react";
import type React from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  refCheck: any;
}

export default function Modal({ isOpen, onClose, children, refCheck }: ModalProps) {

  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && closeRef.current) {
      closeRef.current.focus();
    } else if( !isOpen && buttonRef?.current){
        buttonRef.current.focus();
        refCheck = buttonRef.current;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-2xl"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="min-h-100 min-w-100 rounded-lg border border-transparent bg-white">
        <div className="mb-3 flex w-full justify-end rounded-t-lg bg-green-600 p-3">
          <button
            ref={closeRef}
            onClick={onClose}
            className="cursor-pointer text-black hover:text-white"
          >
            <X />
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body
  );
}

// export default function Modal({ isOpen, onClose, children }: ModalProps) {
//   if (!isOpen) return null;

//   return createPortal(
//     <div
//       className="fixed inset-0 bg-black/30 backdrop-blur-2xl flex items-center justify-center z-50"
//       onClick={onClose}
//     >
//       <div onClick={(e) => e.stopPropagation()} className="rounded-lg border min-w-100 min-h-100 border-transparent bg-white">
//         <div className="mb-3 bg-green-600 w-full rounded-t-lg flex justify-end p-3">
//           <button
//             onClick={onClose}
//             className="cursor-pointer text-black hover:text-white"
//           >
//             <X />
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>,
//     document.body
//   );
// }
