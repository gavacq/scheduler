import {useState} from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  };

  const back = () => {
    setMode(prev => {
      if (prev !== "FIRST") {
        return history[history.length - 2];
      } else {
        return prev;
      }
    });
    setHistory(prev => {
      if (prev.length > 1) {
        return [...prev.slice(0, -1)];
      } else {
        return prev;
      }
    });
  };

  return {
    mode,
    transition,
    back
  };
};

export default useVisualMode;
