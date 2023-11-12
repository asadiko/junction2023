import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { signal } from "@preact/signals-react";
import { useEffect } from "react";
import { TypewriterComponent } from "./Typewriter";

const isTypewriterDone = signal(
  JSON.parse(localStorage.getItem("typewriter") || "false")
);

const initialValue = isTypewriterDone.value

export const MainLayout = () => {
  useEffect(() => {
    if (isTypewriterDone.value) return;

    setTimeout(() => {
        isTypewriterDone.value = true
    }, 4500);
  }, []);

  return (
    <main className="w-full primary">
      {!isTypewriterDone.value ? (
        <div className="typewriter_wrapper">
          <TypewriterComponent />
        </div>
      ) : (
        <div className={["main_animated_content", initialValue && "done"].join(' ')}>
          <div className="blur_primary"></div>
          <div className="z-20 w-full p-4 relative">
            <Navbar />
            <Outlet />
          </div>
        </div>
      )}
    </main>
  );
};
