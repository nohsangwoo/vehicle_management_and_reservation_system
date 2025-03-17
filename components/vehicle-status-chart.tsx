"use client"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

export function VehicleStatusChart() {
  const data = {
    labels: ["입차", "상담 대기", "상담 완료", "출차"],
    datasets: [
      {
        data: [24, 8, 12, 6],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(234, 179, 8, 0.7)",
          "rgba(34, 197, 94, 0.7)",
          "rgba(107, 114, 128, 0.7)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(107, 114, 128, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  }

  return <Pie data={data} options={options} />
}

