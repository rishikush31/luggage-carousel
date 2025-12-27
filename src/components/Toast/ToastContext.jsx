import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, duration = 5000) => {
    const id = Date.now() + Math.random();

    setToasts((prev) => [...prev, { id, message }]);

    // auto remove toast after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);

  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed top-4 right-4 space-y-2 z-[9999]">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-white border-4 text-xl font-bold border-black px-4 py-2 rounded-lg shadow-md flex items-center justify-between animate-slide-left"
          >
            <span>{t.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((p) => p.id !== t.id))}
              className="ml-2 font-bold hover:scale-110 transition-transform"
            >
              X
            </button>
          </div>
        ))}
      </div>

    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
