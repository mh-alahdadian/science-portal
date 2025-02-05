import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { toPersianNumber } from "utils/helper";
import PropTypes from "prop-types";

const RadialBar = ({ data }) => {
  const selectColor = ["#201089", "#2916B6", "#462EE5", "#8171EF", "#C1B8FA"];

  const paddedData = [...data];
  while (paddedData.length < 5) {
    paddedData.push({ title: "", y: 0 });
  }

  const options = {
    colors: ["#FFD700", "#C0C0C0", "#CD7F32"],
    chart: {
      type: "column",
      inverted: true,
      polar: true,
      backgroundColor: "transparent",
    },
    title: {
      text: "",
      align: "left",
    },
    subtitle: {
      text: "",
      align: "left",
    },
    pane: {
      size: "85%",
      innerSize: "20%",
      endAngle: 270,
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      tickInterval: 1,
      labels: {
        align: "right",
        useHTML: true,
        allowOverlap: true,
        step: 1,
        y: 3,
        style: {
          fontSize: "12px",
          fontFamily: "iranyekan",
        },
      },
      lineWidth: 0,
      gridLineWidth: 0,
      categories: paddedData.map((item) =>
        item?.username ? "@" + item?.username : item.title,
      ),
    },
    yAxis: {
      lineWidth: 0,
      tickInterval: 1,
      reversedStacks: false,
      endOnTick: true,
      showLastLabel: true,
      gridLineWidth: 0,
      visible: false,
    },
    tooltip: {
      headerFormat: "",
      backgroundColor: "#efefef",
      textAlign: "center",
      useHTML: true,
      shadow: false,
      formatter: function () {
        return `<div style="display:flex;flex-direction:column;gap:8px;text-align:center;font-family:iranyekan,serif"><div>${
          this.key
        }</div><div>${toPersianNumber(this.y)}</div></div>`;
      },
    },
    plotOptions: {
      column: {
        stacking: "normal",
        borderWidth: 0,
        pointPadding: 0,
        groupPadding: 0.15,
        borderRadius: "50%",
      },
      // series: {
      //   dataLabels: {
      //     enabled: true,
      //     formatter: function () {
      //       return `<p style="font-family:Vazir;font-size:14px">${toPersianNumber(
      //         this.y
      //       )}</p>`;
      //     },
      //     useHTML: true,
      //   },
      // },
    },
    series: [
      {
        name: "media count",
        data: paddedData.map((item, index) => {
          return {
            name: item.username,
            y: +item.y,
            color: selectColor[index],
          };
        }),
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

RadialBar.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      y: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
export default RadialBar;
