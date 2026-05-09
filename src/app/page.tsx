import SpendForm from "@/components/SpendForm";
import DarkModeToggle from "../components/DarkModeToggle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";
import SocialProof from "../components/SocialProof";
import CTA from "../components/CTA";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="grid-pattern min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100 px-4 py-6 text-black transition-all duration-300 dark:from-black dark:via-gray-950 dark:to-black dark:text-white sm:px-6 lg:px-8">
        <section className="mx-auto max-w-6xl">
          <div className="fade-up animate-delay-1 mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Trusted AI Spend Intelligence
              </p>

              <h2 className="bg-linear-to-r from-black to-gray-600 bg-clip-text text-xl font-bold text-transparent dark:from-white dark:to-gray-400">
                Credex Dashboard
              </h2>
            </div>

            <DarkModeToggle />
          </div>

          <div className="grid gap-10 xl:grid-cols-[1fr_540px] xl:items-start">
            <section className="glass-surface fade-up relative z-10 isolate overflow-hidden rounded-4xl border border-white/10 p-6 shadow-xl lg:p-10 text-center lg:text-left">
              <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-green-200/30 blur-3xl dark:bg-green-500/10" />

              <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10" />

              <div className="card-hover dark-card mb-4 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-xs font-semibold text-gray-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-green-500" />

                AI Infrastructure Optimization Platform
              </div>

              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
                Free AI Spend Audit
              </p>

              <h1 className="bg-linear-to-r from-black via-gray-800 to-gray-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl dark:from-white dark:via-gray-200 dark:to-gray-500">
                Stop overpaying for AI tools
              </h1>

              <p className="dark-muted mt-5 text-base leading-7 text-gray-600 sm:text-lg">
                Enter your AI stack and get an instant audit showing where your
                team can downgrade, switch plans, or save through discounted AI
                infrastructure credits.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="card-hover dark-card rounded-2xl border bg-white p-5 text-black shadow-md transition-all">
                  <p className="text-2xl font-bold">Free</p>

                  <p className="text-sm text-gray-500">
                    No login required
                  </p>
                </div>

                <div className="card-hover dark-card rounded-2xl border bg-white p-5 text-black shadow-md transition-all">
                  <p className="text-2xl font-bold">Instant</p>

                  <p className="text-sm text-gray-500">
                    Audit in seconds
                  </p>
                </div>

                <div className="card-hover dark-card rounded-2xl border bg-white p-5 text-black shadow-md transition-all">
                  <p className="text-2xl font-bold">Shareable</p>

                  <p className="text-sm text-gray-500">
                    Export or copy report
                  </p>
                </div>
              </div>
            </section>

            <section className="fade-up animate-delay-2 xl:sticky xl:top-24">
  <SpendForm />
</section>
          </div>

          <div className="fade-up animate-delay-2 mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card-hover dark-card rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Estimated Savings
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                $12k+
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Potential annual optimization
              </p>
            </div>

            <div className="card-hover dark-card rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Teams Supported
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                Startup → Enterprise
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Flexible AI spend analysis
              </p>
            </div>

            <div className="card-hover dark-card rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Audit Time
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                Under 60s
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Instant optimization insights
              </p>
            </div>
          </div>
        </section>

        <SocialProof />
        <FAQ />
      </main>

      <CTA />
      <Footer />
    </>
  );
}