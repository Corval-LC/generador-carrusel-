"use client"

export function ProBlockModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
        <h2 className="text-lg font-bold mb-2">
          Función Premium 🔒
        </h2>

        <p className="text-sm text-zinc-500 mb-6">
          Esta función está disponible solo para
          usuarios PRO.
        </p>

        <button className="w-full bg-black text-white py-2 rounded-xl font-semibold mb-2">
          Desbloquear PRO
        </button>

        <button
          onClick={onClose}
          className="text-sm text-zinc-400 hover:underline"
        >
          Ahora no
        </button>
      </div>
    </div>
  )
}
