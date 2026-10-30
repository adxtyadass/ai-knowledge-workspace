import { X } from "@phosphor-icons/react";
import type React from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  refCheck?: any;
  heading?: string;
}

export default function Modal({ isOpen, onClose, children, refCheck, heading }: ModalProps) {

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-jet-black/40 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg animate-[fadeInScale_0.2s_ease-out] overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl shadow-black/10">
        {/* Header */}
        <div
          className={`flex w-full items-center border-b border-slate-100 px-5 py-4 ${
            heading ? "justify-between" : "justify-end"
          }`}
        >
          {heading && (
            <h3 className="text-[15px] font-semibold text-dark">{heading}</h3>
          )}
          <button
            ref={closeRef}
            onClick={onClose}
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-slate-100 hover:text-dark"
          >
            <X className="size-4" weight="bold" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
