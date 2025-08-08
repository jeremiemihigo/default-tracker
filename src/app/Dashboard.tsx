"use client";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ITableauPar } from "./interface/IOther";

// Enregistrement des composants nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type Props = {
  donner: ITableauPar[];
};

const colors = [
  {
    borderColor: "rgba(255, 99, 132, 1)",
    backgroundColor: "rgba(255, 99, 132, 0.2)",
  },
  {
    borderColor: "rgba(75, 192, 192, 1)",
    backgroundColor: "rgba(75, 192, 192, 0.2)",
  },
  {
    borderColor: "rgba(255, 206, 86, 1)",
    backgroundColor: "rgba(255, 206, 86, 0.2)",
  },
];

const LineChart = ({ donner }: Props) => {
  console.log(donner);
  const data = {
    labels: ["PAR 30", "PAR 60", "PAR 90", "PAR 120"],
    datasets: donner.map((x, key) => {
      return {
        label: x.label,
        data: x.data,
        borderColor: colors[key].borderColor,
        backgroundColor: colors[key].backgroundColor,
        fill: false,
        tension: 0.3,
      };
    }),
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Variation d'actions pour ce mois",
      },
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        suggestedMin: 0,
        suggestedMax: 120,
        title: {
          display: true,
          text: "Nombre d'actions",
        },
      },
      x: {
        title: {
          display: true,
          text: "Par",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
