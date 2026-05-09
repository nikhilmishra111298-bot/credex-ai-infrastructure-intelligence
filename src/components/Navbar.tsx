export default function Navbar() {
  return (
    <header className="container-blur sticky top-0 z-50 border-b border-white/10 bg-white/80 dark:bg-black/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
        </div>
        <div className="flex items-center gap-3">
  <div className="bg-linear-to-br from-black to-gray-800 flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-lg">
  C
</div>

  <div>
    <h1 className="bg-linear-to-r from-black to-gray-600 bg-clip-text text-xl font-bold text-transparent dark:from-white dark:to-gray-400">
      Credex
    </h1>

          <p className="text-xs text-gray-500">
            AI Spend Audit
          </p>
        </div>

        <div className="hidden items-center gap-6 text-sm text-gray-600 md:flex">
          <p>AI Optimization</p>
          <p>Infrastructure Savings</p>
          <p>Procurement Intelligence</p>
        </div>
      </div>
    </header>
  );
}