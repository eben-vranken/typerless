import { useState, useEffect, useRef } from "react";
import "./Stylings/Practice.css";
import Loader from "./Loader";
import Snackbar from "./Snackbar";

const Practice = () => {
  const apiUrl = "https://api.quotable.io/random";

  // Fetch data
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const abortCont = new AbortController();
  const snackbarRef = useRef(null);

  const fetchData = async () => {
    setIsPending(true);
    fetch(`${apiUrl}`, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error(`Could not fetch the data! ${res.status} error status.`);
        }
        return res.json();
      })
      .then((data) => {
        data.content = data.content.replace("’", "'");
        setState({ ...state, text: data.content });
        setIsPending(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setIsPending(false);
      });
  };

  // Template state
  const initialState = {
    text: "",
    userInput: "",
    symbols: 0,
    time: new Date(),
    started: false,
    finished: false,
    mistakes: 0,
    currentWrong: false,
  };

  // When data has arrived, set the text of template state
  data && (initialState.text = data.content);

  // Make current state templateState
  let [state, setState] = useState(initialState);

  // On finish
  const handleFinish = (reset) => {
    setState({ ...state, finished: true });

    if (!reset) {
      const time = (
        (new Date().getTime() - state.time.getTime()) /
        1000
      ).toFixed(1);
      const wpm = (state.text.split(" ").length / (time / 60)).toFixed(1);

      localStorage.setItem(
        `${localStorage.length}`,
        JSON.stringify({
          time: time,
          wpm: wpm,
          mistakes: state.mistakes,
          date: new Date().toLocaleDateString(),
          id: localStorage.length,
        })
      );

      snackbarRef.current.show();
    }

    state = initialState;
    {
      isPending || fetchData();
    }
  };

  // Fetch data on load
  useEffect(() => {
    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    if (!isPending) {
      const len = state.userInput.length;
      const mistake = state.text.slice(0, len) !== state.userInput;
      if (mistake) {
        if (!state.currentWrong) {
          state.mistakes++;
        }
        state.currentWrong = true;
      } else {
        state.currentWrong = false;
      }
      if (state.text === state.userInput) handleFinish(false);
    }
  }, [state]);

  useEffect(() => {
    setState({
      ...state,
      time: new Date(),
    });
  }, [state.started]);

  // Update state on input
  const handleInput = (e) => {
    setState({
      ...state,
      text: state.text,
      userInput: e.target.value,
      started: true,
    });
  };

  // Don't allow illegal characters (arrowkeys)
  const handleIllegal = (e) => {
    const illegalCharacters = [
      "ArrowDown",
      "ArrowUp",
      "ArrowLeft",
      "ArrowRight",
    ];
    if (illegalCharacters.includes(e.key)) e.preventDefault();

    if (e.key == "Tab") {
      e.preventDefault();
      e.stopPropagation();
      handleFinish(true);
    }
  };

  return (
    <section className="practice">
      <input
        autoFocus
        type="text"
        className="practice-input"
        name="practice-input"
        aria-label="practice-input"
        // Check for arrow keys
        onKeyDown={(e) => handleIllegal(e)}
        // Handle text
        onInput={(e) => handleInput(e)}
        // Don't allow select
        onSelect={(e) => (e.target.selectionStart = e.target.selectionEnd)}
        maxLength={state.text.length}
        value={state.userInput}
      />
      <section className="information">
        <p>
          Press <span>TAB</span> to reset question.
        </p>
        <p>Timing only starts once you type.</p>
        <p>Complete 100% to pass.</p>
      </section>
      <section className="practice-text">
        {/* While pending, set the loader */}
        {isPending && <Loader />}
        {/* While pending, don't set the practice text */}
        {isPending ||
          state.text.split("").map((c, i) => {
            let color;
            if (i < state.userInput.length) {
              if (c === state.userInput[i]) {
                color = "correct";
              } else {
                color = "incorrect";
                if (c === " ") color += " space";
              }
            }
            var current = i === state.userInput.length ? "current" : "";

            return (
              <span key={i} className={`${color} ${current}`}>
                {c}
              </span>
            );
          })}
      </section>
      <Snackbar
        ref={snackbarRef}
        data={
          localStorage.length &&
          JSON.parse(localStorage.getItem(localStorage.length - 1))
        }
      />
    </section>
  );
};

export default Practice;
