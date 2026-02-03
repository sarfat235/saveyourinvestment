import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-md bg-black text-white p-4 shadow"
        >
          {toast.title && <div className="font-bold">{toast.title}</div>}
          {toast.description && <div>{toast.description}</div>}
          <button
            onClick={() => dismiss(toast.id)}
            className="mt-2 text-sm underline"
          >
            Close
          </button>
        </div>
      ))}
    </div>
  )
}

