const stats = [
  { label: "AI tools supported", value: "8+" },
  { label: "Audit time", value: "<60s" },
  { label: "Login required", value: "No" },
];

export default function SocialProof() {
  return (
    <section className="section-spacing px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.label}
          className="card-hover dark-card rounded-2xl border bg-white p-6 text-center text-black shadow-md transition-all"
          >
            <p className="text-3xl font-bold">{item.value}</p>
            <p className="mt-2 text-sm text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}