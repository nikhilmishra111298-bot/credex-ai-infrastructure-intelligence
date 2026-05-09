export default function CTA() {
  return (
        <section className="mt-20 px-4 sm:px-6 lg:px-8">
      <div className="soft-border relative isolate mx-auto max-w-5xl overflow-hidden rounded-3xl bg-linear-to-br from-black via-gray-900 to-black px-6 py-14 text-center text-white shadow-2xl sm:px-8">
        <div className="relative z-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">
          AI Infrastructure Savings
        </p>
        <div className="pointer-events-none absolute inset-0 z-0 opacity-30">
  <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

  <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-green-500/20 blur-3xl" />
</div>

        <h2 className="bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text mt-4 text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
  Your AI stack may be costing more than you think
</h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
          Run a free audit and identify wasted AI spend, duplicated tooling,
          and optimization opportunities across your organization.
        </p>

       <div className="relative z-10 mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <button className="glow-button card-hover rounded-2xl bg-white px-6 py-3 font-semibold text-black shadow-lg">
  Run Free Audit
</button>

          <button className="card-hover rounded-2xl border border-gray-700 px-6 py-3 font-semibold text-white">
  Learn More
</button>
        </div>
      </div>
      </div>
    </section>
  );
}