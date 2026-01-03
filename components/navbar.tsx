import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-10 py-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-4 h-1 bg-white rounded-full -rotate-45 translate-x-0.5" />
            <div className="w-4 h-1 bg-white rounded-full rotate-45 -translate-x-0.5" />
          </div>
          <span className="font-bold text-xl tracking-tight">LinkCarousel</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="font-medium">
            Log in
          </Button>
          <Button className="bg-black text-white hover:bg-zinc-800 rounded-full px-6">
            Sign up
          </Button>
        </div>

      </div>
    </nav>
  )
}
