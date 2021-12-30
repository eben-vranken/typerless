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

const StatisticsChart = ({ data, text, color }) => {
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
                  return item[data];
                })
                .reverse(),
              borderWidth: 2,
              borderColor: color || "#fff",
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
              ticks: {
                callback: function (value) {
                  return `${value} ${text}`;
                },
              },
            },
          },
        }}
      />
    </section>
  );
};

export default StatisticsChart;
