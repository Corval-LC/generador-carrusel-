import { testSupabase } from "@/app/actions/testSupabase";

export function TestSupabaseButton() {
  return (
    <form action={testSupabase}>
      <button
        type="submit"
        className="rounded bg-black px-4 py-2 text-white"
      >
        Probar Supabase
      </button>
    </form>
  );
}
