import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Editor } from "@/components/editor"

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-black selection:text-white">
      <Navbar />
      <Hero />
      <div className="max-w-(--break-2xl) mx-auto px-4 pb-20">
        <Editor />
      </div>
    </main>
  )
}
