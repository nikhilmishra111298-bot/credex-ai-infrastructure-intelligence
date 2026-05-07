"use client";

import { useState } from "react";

export default function LeadCapture() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-xl border bg-green-50 p-5">
        <h3 className="font-bold text-green-800">Report saved</h3>
        <p className="mt-1 text-sm text-green-700">
          We’ll notify you when new AI spend optimizations apply.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-5 text-black">
      <h3 className="text-lg font-bold">Save your audit report</h3>
      <p className="mt-1 text-sm text-gray-600">
        Enter your email to capture this report.
      </p>

      <div className="mt-4 space-y-3">
        <input
          type="email"
          placeholder="Email address"
          className="w-full rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="Company name optional"
          className="w-full rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="Role optional"
          className="w-full rounded-lg border p-3"
        />

        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="w-full rounded-xl bg-black px-5 py-3 font-semibold text-white"
        >
          Save report
        </button>
      </div>
    </div>
  );
}