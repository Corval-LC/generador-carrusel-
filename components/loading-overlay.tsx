export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-300 border-t-black" />

        <p className="text-sm font-medium text-zinc-600">
          Analizando el video y extrayendo ideas clave…
        </p>
      </div>
    </div>
  )
}
