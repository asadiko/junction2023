import { useEffect } from "react";
import "../styles/loader.css";
import { signal } from "@preact/signals-react";

const loadingMessages = [
    "Collecting data...",
    "Generating platform...",
    "Preparing dashboard...",
]

const currentMessageIndex = signal(0)

export const CodeLoader = () => {

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (currentMessageIndex.value >= loadingMessages.length) {
                currentMessageIndex.value = 0
            } else {
                currentMessageIndex.value = currentMessageIndex.value + 1
            }
        }, 3500)

        return () => clearInterval(intervalId)
    }, [])

  return (
    <div className="loader_wrapper">
        <div className="loading_message">
            {loadingMessages[currentMessageIndex.value]}
        </div>
      <div className="loader">
        <div className="box box0">
          <div></div>
        </div>
        <div className="box box1">
          <div></div>
        </div>
        <div className="box box2">
          <div></div>
        </div>
        <div className="box box3">
          <div></div>
        </div>
        <div className="box box4">
          <div></div>
        </div>
        <div className="box box5">
          <div></div>
        </div>
        <div className="box box6">
          <div></div>
        </div>
        <div className="box box7">
          <div></div>
        </div>
        <div className="ground">
          <div></div>
        </div>
      </div>
    </div>
  );
};
