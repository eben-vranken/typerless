import StatisticsChart from "./StatisticsChart";
import "./Stylings/Statistics.css";

const Statistics = () => {
  let data = JSON.parse(localStorage.getItem("practice-stats")) || [];

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
    description: "",

    calculateWpmDescription: function () {
      const wpm = Math.round(this.avgWpm);
      switch (true) {
        case wpm <= 19:
          return `You type around one word every 6 seconds. Learn the poper typing technique and practice to improve your speed!`;
        case wpm <= 29:
          return `With your typing speed, you type about one word every 3 seconds, try to focus on your technique and keep practicing.`;
        case wpm <= 39:
          return `Your typing speed is below average. Keep practicing to improve your speed and accuracy!`;
        case wpm <= 49:
          return `At ${wpm}, you are now an average typist. You still have significant room from for improvement.`;
        case wpm <= 59:
          return `Congratulations, with an average typing speed of ${wpm}, you're above the global average!`;
        case wpm <= 69:
          return `Congratulations, you have the typing speed required for most jobs. You can now be a profesional typist.`;
        case wpm <= 79:
          return `You are way above average and would qualify for any typing job, assuming your accuracy is high enough.`;
        case wpm <= 89:
          return `You're a catch! Any employer looking for a typist would love to have you`;
        case wpm <= 99:
          return `At this speed, you're probably a gamer, coder, or genius. You're doing great!`;
        default:
          return `You are in the top 1% of typists! Congratulations`;
      }
    },
  };

  averages.description = averages.calculateWpmDescription();
  data.sort((a, b) => b.id - a.id);

  return (
    <section className="statistics">
      {localStorage.getItem("practice-stats") ? (
        <>
          <section className="average-container">
            <section className="average-stats">
              <section className="average average-wpm">
                <span className="wpm-title">wpm</span>
                <span>{averages.avgWpm}</span>
              </section>
              <section className="average">
                <span>{averages.avgTime}s</span>
                <span className="mistakes">{averages.avgMistake}</span>
              </section>
              <p className="description">{averages.description}</p>
            </section>
          </section>
          <StatisticsChart data={"wpm"} color={"#0c7c59"} text={"wpm"} />
          <StatisticsChart
            data={"mistakes"}
            color={"#d64933"}
            text={"mistakes"}
          />
        </>
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

{
  /* */
}
export default Statistics;
