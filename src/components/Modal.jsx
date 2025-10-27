import { useEffect, useRef } from "react";

const Modal = ({ open, title, children, onClose }) => {
  const previouslyFocused = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement;
    // Focus the close button for accessibility
    closeBtnRef.current?.focus?.();
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "Tab") {
        // basic focus trap within modal
        const focusable = Array.from(
          document.querySelectorAll(
            ".modal button, .modal a, .modal input, .modal select, .modal textarea, .modal [tabindex]:not([tabindex='-1'])"
          )
        ).filter((el) => !el.hasAttribute("disabled"));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;
  const titleId = "modal-title";
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title" id={titleId}>{title}</h2>
          <button ref={closeBtnRef} className="modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
