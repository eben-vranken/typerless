import "./Stylings/Statistics.css";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";

const Statistics = () => {
  let data = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    data.push(JSON.parse(localStorage.getItem(keys[i])));
  }

  // Calculate averages
  let count, totalWpm, totalTime, totalMistake;
  count = totalWpm = totalTime = totalMistake = 0;

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      totalWpm += parseFloat(data[key].wpm);
      totalTime += parseFloat(data[key].time);
      totalMistake += parseFloat(data[key].mistakes);
      count += 1;
    }
  }

  const averages = {
    avgWpm: (totalWpm / count).toFixed(1),
    avgTime: (totalTime / count).toFixed(1),
    avgMistake: (totalMistake / count).toFixed(1),
  };

  data.sort((a, b) => b.id - a.id);

  return (
    <section className="statistics">
      {localStorage.length ? (
        <section className="average-container">
          <p className="average-title">Average</p>
          <section className="average-stats">
            <section className="average average-wpm">
              <span className="wpm-title">wpm</span>
              <span>{averages.avgWpm}</span>
            </section>
            <section className="average">
              <span>{averages.avgTime}s</span>
              <span className="mistakes">{averages.avgMistake}</span>
            </section>
          </section>
        </section>
      ) : (
        <p>No statistics to be shown! Practice at least once!</p>
      )}
      <table className="statistics-list">
        <tbody>
          {data.map((item, i) => {
            return (
              <tr key={i} className="statistics-item">
                <th className="date">{item.date}</th>
                <th className="wpm">{item.wpm}wpm</th>
                <th className="time">{item.time}s</th>
                <th className="mistakes">
                  {item.mistakes}
                  {"\u00A0"}
                  <span>mistakes</span>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Statistics;
