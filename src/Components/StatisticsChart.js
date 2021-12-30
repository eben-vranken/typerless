import React from "react";
import "./Stylings/StatisticsChart.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatisticsChart = ({ dataset }) => {
  console.log(typeof dataset);
  return (
    <section className="chart">
      <Line
        data={{
          type: "line",
          labels: JSON.parse(localStorage.getItem("practice-stats")).map(
            (item) => {
              return item.date;
            }
          ),
          datasets: [
            {
              data: JSON.parse(localStorage.getItem("practice-stats"))
                .map((item) => {
                  return item["wpm"];
                })
                .reverse(),
              borderWidth: 2,
              borderColor: "#0c7c59",
            },
            {
              data: JSON.parse(localStorage.getItem("practice-stats"))
                .map((item) => {
                  return item["mistakes"];
                })
                .reverse(),
              borderWidth: 2,
              borderColor: "#d64933",
            },
          ],
        }}
        options={{
          responsive: true,
          tension: 0.5,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              ticks: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </section>
  );
};

export default StatisticsChart;
