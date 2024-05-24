import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
} from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { D1, M1, W1, W12, Y1 } from "./Data";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const options = {
  scales: {
    x: {
      time: {
        displayFormats: {
          hour: "HH:mm",
        },
        ticks: {
          color: "#0c0909",
        },
      },
      ticks: {
        color: "#130d0d",
      },
      
    },  
    y: {
      type: "linear",

      ticks: {
        color: "#141111",
      },


    },
  },
} as ChartOptions<"line">;

export default function App() {
  const [dt, setDt] = useState<any>(W12);
  const [hl, setHl] = useState<"H" | "D" | "W" | "M" | "Y">("H");

  const ml = dt;

  let labels: string[] = [];
  let unixTime = ml["startTime"];

  ml.rates.forEach(() => {
    let date = new Date(unixTime);

    let hours = date.getHours();
    let minutes = date.getMinutes();

    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");

    let day = date.getDate().toString().padStart(2, "0");

    let timeString = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    unixTime += ml["interval"];

    labels.push(
      hl == "H" || hl == "D"
        ? timeString
        : hl == "W" || hl == "M"
        ? month + "." + day
        : month + "." + year
    );
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: ml.rates.map((a: number) => a * 1000),
        borderColor: "#2c036e",
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className="container">
      <div className="btns">
        <button
          className={hl == "H" ? "activ" : ""}
          onClick={() => {
            setDt(W12);
            setHl("H");
          }}
        >
          12H
        </button>
        <button
          className={hl == "D" ? "activ" : ""}
          onClick={() => {
            setDt(D1);
            setHl("D");
          }}
        >
          1D
        </button>
        <button
          className={hl == "W" ? "activ" : ""}
          onClick={() => {
            setDt(W1);
            setHl("W");
          }}
        >
          1W
        </button>
        <button
          className={hl == "M" ? "activ" : ""}
          onClick={() => {
            setDt(M1);
            setHl("M");
          }}
        >
          1M
        </button>
        <button
          className={hl == "Y" ? "activ" : ""}
          onClick={() => {
            setDt(Y1);
            setHl("Y");
          }}
        >
          1Y
        </button>
      </div>
      <Line
        style={{ height: "80vh", margin: "0px auto" }}
        data={data}
        options={options}
      />
    </div>
  );
}
