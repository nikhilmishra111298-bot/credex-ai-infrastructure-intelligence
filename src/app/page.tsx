import SpendForm from "../components/Spendform";
import DarkModeToggle from "../components/DarkModeToggle";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-black transition-colors dark:bg-black dark:text-white">
      <section className="mx-auto max-w-4xl text-center">
        <div className="mb-6 flex justify-end">
  <DarkModeToggle />
</div>
        <p className="mb-3 text-sm font-semibold text-gray-500">
          Free AI Spend Audit
        </p>

        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Stop overpaying for AI tools
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
          Enter your AI tool stack and get an instant audit showing where you can save.
        </p>
      </section>

      <section className="mx-auto mt-10 max-w-2xl">
        <SpendForm />
      </section>
    </main>
  );
}