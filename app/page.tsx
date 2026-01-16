import { Navbar } from "@/components/navbar";
import { Wizard } from "@/components/wizard/Wizard";
import { TestSupabaseButton } from "@/components/TestSupabaseButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-black selection:text-white">
      <Navbar />

      <div className="pt-16">
        <Wizard />

        <div className="mt-8 px-4">
          <TestSupabaseButton />
        </div>
      </div>
    </main>
  );
}
