import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { age } from "utils/selectIcon.js";
const Bar = ({ data }) => {
  const options = {
    chart: {
      type: "column",
      height: "240px",
    },
    title: {
      text: "",
      enabled: false,
    },
    subtitle: {
      enabled: false,
    },
    xAxis: {
      visible: false,
    },
    yAxis: { visible: false },
    tooltip: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
      series: {
        borderRadius: {
          radius: 8,
        },
        enableMouseTracking: false,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          formatter: function () {
            return age[this.key];
          },
          useHTML: true,
        },
      },
    },
    legend: { enabled: false },
    series: [
      {
        name: "Age",
        data: [
          {
            name: "نوجوان",
            y: data.teen,
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, "#43B3E4"],
                [1, "#FFFFFF00"],
              ],
            },
          },
          {
            name: "جوان",
            y: data.young,
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, "#2A7DE0"],
                [1, "#FFFFFF00"],
              ],
            },
          },
          {
            name: "میانسال",
            y: data.adult,
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, "#3144EF"],
                [1, "#FFFFFF00"],
              ],
            },
          },
          {
            name: "سالخورده",
            y: data.old,
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, "#5911CF"],
                [1, "#FFFFFF00"],
              ],
            },
          },
        ],
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Bar;
