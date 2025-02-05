import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import PropTypes from "prop-types";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";
import { shortener, toPersianNumber } from "utils/helper.js";
highchartsMore(Highcharts);
solidGauge(Highcharts);

const SolidgaugeChart = ({
  age = "teen",
  names,
  trackColors = ["#1DCEA3", "#6D72E5", "#DB6DE5", "#F7A912"],
  firstPercentage = -1,
  secondPercentage = -1,
  thirdPercentage = -1,
  fourthPercentage = -1,
  minWidth = "19rem",
  maxWidth = "40rem",
}) => {
  const [ageImg, setAgeImg] = useState("");
  const [ageState, setAgeState] = useState(age);

  const ageHandler = () => {
    switch (age) {
      case "old":
        setAgeState("سالخورده");
        setAgeImg("/old_man.svg");
        break;
      case "adult":
        setAgeState("میانسال");
        setAgeImg("/middle_aged.svg");
        break;
      case "young":
        setAgeState("جوان");
        setAgeImg("/young.svg");
        break;
      case "teen":
        setAgeState("کودک");
        setAgeImg("/kid.svg");
        break;
      default:
        setAgeState("جوان");
        setAgeImg("/young.svg");
        break;
    }
  };

  useEffect(() => {
    ageHandler();
  }, [age]);

  let percentages = [];

  if (firstPercentage !== -1) {
    percentages.push(firstPercentage);
  }
  if (secondPercentage !== -1) {
    percentages.push(secondPercentage);
  }
  if (thirdPercentage !== -1) {
    percentages.push(thirdPercentage);
  }
  if (fourthPercentage !== -1) {
    percentages.push(fourthPercentage);
  }

  const chartRef = useRef(null);
  const [legendWidth, setLegendWidth] = useState("auto");

  useEffect(() => {
    if (chartRef.current) {
      // Set the legend width equal to the chart's width
      setLegendWidth(`${chartRef.current.offsetWidth * 0.7}px`);
    }
  }, [names]);

  const options = {
    chart: {
      type: "solidgauge",
      // height: 360,
      // width: 360,
      marginTop: 10,
      marginBottom: 105,
      style: { margin: "auto" },
    },
    accessibility: {
      enabled: false,
    },
    legend: {
      rtl: false,
      useHTML: true,
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
      symbolHeight: 0,
      symbolWidth: 0,
      symbolRadius: 0,
      itemStyle: {
        fontSize: "14px",
        color: "#333",
        cursor: "default",
      },
      labelFormatter: function () {
        const index = this.index;
        const colors = trackColors;
        const percentage = percentages[index];
        if (!percentages[index] || percentages[index] === -1) return "";

        return `
          <div style="display: grid; grid-template-columns: 1fr 1fr; font-family:iranyekan,serif;width:${legendWidth};padding:2px;">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0">
    <span style="padding: 0 5px;">${toPersianNumber(percentage)}%</span>
  </div>

  <div style="display: flex; align-items: center; justify-content: end;">
    <span style="padding: 0 5px; font-family: iranyekan,serif; min-width: 40px; text-align: left;">
      ${shortener(names[index], 12, "rtl")}
    </span>
    <div style="width: 12px; height: 12px; background-color: ${
      colors[index]
    }; margin-right: 5px; border-radius: 50%;"></div>
  </div>
</div>
        `;
      },
    },
    title: null,
    pane: {
      startAngle: 0,
      endAngle: 360,
      background: [
        firstPercentage !== -1 && {
          backgroundColor: "#e0e0e0",
          outerRadius: "111%",
          innerRadius: "97%",
          borderWidth: 0,
        },
        secondPercentage !== -1 && {
          backgroundColor: "#e0e0e0",
          outerRadius: "90%",
          innerRadius: "77%",
          borderWidth: 0,
        },
        thirdPercentage !== -1 && {
          backgroundColor: "#e0e0e0",
          outerRadius: "70%",
          innerRadius: "56%",
          borderWidth: 0,
        },
        fourthPercentage !== -1 && {
          backgroundColor: "#e0e0e0",
          outerRadius: "50%",
          innerRadius: "37%",
          borderWidth: 0,
        },
      ],
    },
    tooltip: {
      enabled: false,
    },
    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: [],
    },
    plotOptions: {
      solidgauge: {
        enableMouseTracking: false,
        showInLegend: true,
        dataLabels: {
          enabled: true,
          borderWidth: 0,
          useHTML: true,
          x: 0,
          y: -30,
          style: {
            fontFamily: "iranyekan",
            fontWeight: "regular",
          },
          formatter: function () {
            return `
              <div style="text-align: center; opacity:0.5; color: gray;">
                <div style="font-size: 24px; display:flex; justify-content: center; color: #000000;">
                  <img src=${ageImg} alt=${ageState} />
                </div>
                <p style='font-size:15px; font-weight:bold;'>
                   ${ageState}
                </p>
              </div>`;
          },
        },
        linecap: "round",
        stickyTracking: false,
        rounded: true,
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      firstPercentage !== -1 && {
        data: [
          {
            color: trackColors[0],
            radius: "111%",
            innerRadius: "97%",
            y: firstPercentage,
          },
        ],
      },
      secondPercentage !== -1 && {
        data: [
          {
            color: trackColors[1],
            radius: "90%",
            innerRadius: "77%",
            y: secondPercentage,
          },
        ],
      },
      thirdPercentage !== -1 && {
        data: [
          {
            color: trackColors[2],
            radius: "70%",
            innerRadius: "56%",
            y: thirdPercentage,
          },
        ],
      },
      fourthPercentage !== -1 && {
        data: [
          {
            color: trackColors[3],
            radius: "50%",
            innerRadius: "37%",
            y: fourthPercentage,
          },
        ],
      },
    ],
  };

  return (
    <div
      ref={chartRef}
      className={`min-w-[${minWidth}] max-w-[${maxWidth}] w-full`}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

SolidgaugeChart.propTypes = {
  age: PropTypes.oneOf(["teen", "young", "adult", "old"]),
  names: PropTypes.arrayOf(PropTypes.string),
  trackColors: PropTypes.arrayOf(PropTypes.string),
  firstPercentage: PropTypes.number,
  secondPercentage: PropTypes.number,
  thirdPercentage: PropTypes.number,
  fourthPercentage: PropTypes.number,
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
};

export default SolidgaugeChart;
