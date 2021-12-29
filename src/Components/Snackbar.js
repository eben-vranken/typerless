import "./Stylings/Snackbar.css";
import { forwardRef, useState, useImperativeHandle } from "react";

const Snackbar = forwardRef(({ data }, ref) => {
  const [toggleSnackbar, setToggleSnackbar] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setToggleSnackbar(true);
    },
  }));

  return (
    <section
      className="snackbar"
      id={toggleSnackbar ? "show" : "hidden"}
      onAnimationEnd={() => {
        setToggleSnackbar(false);
      }}
    >
      {localStorage.getItem("practice-stats") && (
        <>
          <span>wpm</span>
          <span>time</span>
          <span>typos</span>
          <span>{data.wpm}</span>
          <span>{data.time}s</span>
          <span>{data.mistakes}</span>
        </>
      )}
    </section>
  );
});

export default Snackbar;
