const faqs = [
  {
    question: "How does the audit work?",
    answer:
      "Credex analyzes your AI tooling stack and estimates optimization opportunities using deterministic spend rules.",
  },
  {
    question: "Does this connect to my billing accounts?",
    answer:
      "No. This MVP uses manually entered AI spend data and does not access external billing systems.",
  },
  {
    question: "How are savings estimated?",
    answer:
      "Savings are estimated using plan comparisons, seat utilization assumptions, and infrastructure optimization heuristics.",
  },
  {
    question: "Is this free?",
    answer: "Yes. The audit tool is currently free to use.",
  },
];

export default function FAQ() {
  return (
    <section className="section-spacing px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Everything you need to know about the audit platform.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card-hover dark-card rounded-2xl border bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold">
                {faq.question}
              </h3>

              <p className="dark-muted mt-3 leading-7 text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}