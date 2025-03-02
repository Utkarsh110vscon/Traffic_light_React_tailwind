import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { useEffect, useRef, useCallback, useState } from "react";

const App = () => {
  const redRef = useRef(null);
  const orangeRef = useRef(null);
  const greenRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const timeoutsRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [curntTime, setCurntTime] = useState(new Date());

  const arrowArray = [topRef, leftRef, bottomRef, rightRef];

  const resetColor = () => {
    const allRefs = [
      redRef,
      orangeRef,
      greenRef,
      topRef,
      bottomRef,
      rightRef,
      leftRef,
    ];

    // Remove all color classes from each element
    allRefs.forEach((ref) =>
      ref.current?.classList.remove(
        "bg-red-600",
        "bg-orange-600",
        "bg-green-600",
        "text-red-600",
        "text-orange-600",
        "text-green-600"
      )
    );
  };

  const changeColor = useCallback((index) => {
    if (!redRef.current || !orangeRef.current || !greenRef.current) return;
    if (
      !topRef.current ||
      !bottomRef.current ||
      !leftRef.current ||
      !rightRef.current
    )
      return;

    resetColor();

    redRef.current.classList.add("bg-red-600");
    arrowArray[index].current?.classList.add("text-red-600");

    timeoutsRef.current.push(
      setTimeout(() => {
        redRef.current.classList.remove("bg-red-600");
        arrowArray[index].current.classList.remove("text-red-600");
        arrowArray[index].current.classList.add("text-orange-600");
        orangeRef.current.classList.add("bg-orange-600");
      }, 3000),

      setTimeout(() => {
        arrowArray[index].current.classList.remove("text-orange-600");
        arrowArray[index].current.classList.add("text-green-600");
        orangeRef.current.classList.remove("bg-orange-600");
        greenRef.current.classList.add("bg-green-600");
      }, 4000),

      setTimeout(() => {
        greenRef.current.classList.remove("bg-green-600");
        arrowArray[index].current.classList.remove("text-green-600");
      }, 6000)
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurntTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    changeColor(currentIndex);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 6000);

    return () => {
      clearInterval(interval);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [currentIndex, changeColor]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Traffic Light</h1>

      {/* Traffic Lights */}
      <div className="w-[4.5rem] p-2 flex flex-col items-center gap-2 border-2 rounded-md shadow-md">
        <div
          ref={greenRef}
          className="w-10 h-10 rounded-full bg-green-200"
        ></div>
        <div
          ref={orangeRef}
          className="w-10 h-10 rounded-full bg-orange-200"
        ></div>
        <div ref={redRef} className="w-10 h-10 rounded-full bg-red-200"></div>
      </div>

      {/* Direction Arrows */}
      <div className="w-40 h-40 mt-6 relative">
        <div className="w-[50%] h-full absolute right-1/2 translate-x-1/2 flex flex-col items-center justify-between">
          <ArrowUp ref={topRef} className="w-12 h-12" />
          <ArrowDown ref={bottomRef} className="w-12 h-12" />
        </div>

        <div className="w-full h-[50%] absolute top-1/2 -translate-y-1/2 flex items-center justify-between">
          <ArrowLeft ref={leftRef} className="w-12 h-12" />
          <ArrowRight ref={rightRef} className="w-12 h-12" />
        </div>

        {/* <div className="w-15 h-15 rounded-full bg-blue-200 text-xs font-bold absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-black flex justify-center items-center">
          {curntTime.getHours() % 12}:{curntTime.getMinutes()}:
          {curntTime.getSeconds()}
        </div> */}

        <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-white flex justify-center items-center text-sm font-mono font-bold border-2 border-white">
          {String(curntTime.getHours()).padStart(2, "0")}:
          {String(curntTime.getMinutes()).padStart(2, "0")}:
          {String(curntTime.getSeconds()).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
};

export default App;
