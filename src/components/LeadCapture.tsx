"use client";

import { useState } from "react";

export default function LeadCapture() {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          companyName,
          role,
          teamSize: null,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || "Failed to save lead.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Server connection failed.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border bg-green-50 p-5 text-black">
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="Company name optional"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="Role optional"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full rounded-lg border p-3"
        />

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-xl bg-black px-5 py-3 font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save report"}
        </button>
      </div>
    </div>
  );
}