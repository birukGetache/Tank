// pages/index.js
'use client'
import { useEffect, useRef, useState } from "react";
import BottomNavBar from "../components/BottomNavBar";

export default function Home() {
  const canvasRef = useRef(null);
  const [items, setItems] = useState(["Ayele", "Abebe", "Kebebe", "Alemu", "Sisay", "Gebre", "Bisme", "nardi", "chala"]);
  const [winner, setWinner] = useState("NONE");
  const [currentDeg, setCurrentDeg] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [pause, setPause] = useState(false);
  const [maxRotation, setMaxRotation] = useState(0);
  const radius = 250;

  useEffect(() => {
    drawWheel();
  }, [items, currentDeg]);

  const randomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return { r, g, b };
  };

  const toRad = (deg) => deg * (Math.PI / 180.0);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const step = 360 / items.length;
    const colors = items.map(() => randomColor());

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let startDeg = currentDeg;
    items.forEach((item, i) => {
      const endDeg = startDeg + step;
      const color = colors[i];

      // Draw segment
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, toRad(startDeg), toRad(endDeg));
      ctx.lineTo(centerX, centerY);
      ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      ctx.fill();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(toRad((startDeg + endDeg) / 2));
      ctx.textAlign = "center";
      ctx.fillStyle = color.r > 150 || color.g > 150 || color.b > 150 ? "#000" : "#fff";
      ctx.font = "bold 16px Arial";
      ctx.fillText(item, radius - 40, 10);
      ctx.restore();

      if (startDeg % 360 < 360 && startDeg % 360 > 270 && endDeg % 360 > 0 && endDeg % 360 < 90) {
        setWinner(item);
      }

      startDeg = endDeg;
    });
  };

  const spin = () => {
    if (speed !== 0) return;

    setMaxRotation((360 * 6) - (360 / items.length) * items.indexOf("cat")); // Modify "cat" to your desired winner
    setSpeed(20);
    setPause(false);
    animate();
  };

  const animate = () => {
    if (pause) return;

    setSpeed((prevSpeed) => {
      const progress = 1 - currentDeg / maxRotation;
      const newSpeed = Math.sin((progress * Math.PI) / 2) * 20;
      if (newSpeed < 0.01) {
        setPause(true);
        return 0;
      }
      return newSpeed;
    });

    setCurrentDeg((prevDeg) => prevDeg + speed);
    requestAnimationFrame(animate);
  };

  const handleInputChange = (e) => {
    setItems(e.target.value.split("\n"));
  };

  return (
    <div style={{  color: "white", minHeight: "100vh", padding: "20px" }} className="bg-yellow-50 font-playfair">
      <div style={{ textAlign: "center", marginBottom: "40px" }} className="text-[#85726a]">
        <h1>WINNER</h1>
        <p>{winner}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", position: "relative" , height:"95%" , width:"95%"}} className="text-[#85726a]">
        <canvas ref={canvasRef} style={{ border: "1px solid white", width:"95vw", height:'95vw', borderRadius:"50%" }}></canvas>
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
          }}
          onClick={spin}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
              borderRight: "30px solid black",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <textarea
          rows="10"
          cols="30"
          style={{ resize: "none", borderRadius:"10px" }}
          defaultValue={items.join("\n")}
          onChange={handleInputChange}
          className="text-[#85726a] , bg-slate-400  "
        />
      </div>
      <BottomNavBar></BottomNavBar>
    </div>
  );
}
