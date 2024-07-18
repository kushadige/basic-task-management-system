import { useEffect, useRef } from "react";
import { X } from "react-feather";

import { cn } from "@/lib/tw";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ open, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // handle outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [open, onClose]);

  return (
    //  backdrop
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center transition-colors z-50",
        open ? "visible bg-black/20" : "invisible"
      )}
    >
      {/* modal */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "bg-white p-6 transition-all rounded-xl shadow w-4/5 max-w-lg",
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200 ease-in-out"
        >
          <X />
        </button>

        {children}
      </div>
    </div>
  );
};
