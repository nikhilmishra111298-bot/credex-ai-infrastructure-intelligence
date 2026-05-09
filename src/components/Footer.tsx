export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white/80 backdrop-blur dark:bg-black">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-center text-sm text-gray-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:text-left">
        <p>
          © 2026 Credex AI Spend Audit
        </p>

        <div className="flex justify-center gap-4 lg:justify-start">
          <p>Privacy</p>
          <p>Terms</p>
          <p>Contact</p>
        </div>
      </div>
    </footer>
  );
}