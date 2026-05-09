"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  currentSpend: number;
  futureSpend: number;
};

export default function FutureSpendChart({
  currentSpend,
  futureSpend,
}: Props) {
  const monthlyIncrease = (futureSpend - currentSpend) / 6;

  const data = [
    {
      month: "Now",
      spend: currentSpend,
    },
    {
      month: "1M",
      spend: Math.round(currentSpend + monthlyIncrease),
    },
    {
      month: "2M",
      spend: Math.round(currentSpend + monthlyIncrease * 2),
    },
    {
      month: "3M",
      spend: Math.round(currentSpend + monthlyIncrease * 3),
    },
    {
      month: "4M",
      spend: Math.round(currentSpend + monthlyIncrease * 4),
    },
    {
      month: "5M",
      spend: Math.round(currentSpend + monthlyIncrease * 5),
    },
    {
      month: "6M",
      spend: futureSpend,
    },
  ];

  return (
    <div className="mt-5 height: 260px; rounded-xl bg-gray-50 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="spend"
            strokeWidth={3}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}