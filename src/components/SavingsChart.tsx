"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartItem = {
  tool: string;
  savings: number;
};

type Props = {
  data: ChartItem[];
};

export default function SavingsChart({ data }: Props) {
  return (
    <div className="rounded-xl bg-white p-5">
      <h3 className="mb-5 text-lg font-bold">
        Savings Breakdown
      </h3>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="tool" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="savings" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}