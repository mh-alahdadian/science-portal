import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import PropTypes from "prop-types";
import { formatShortNumber, shortener, toPersianNumber } from "utils/helper.js";

const ReleaseChart = ({ series, isCompare = false }) => {
  const trackColors = ["#1DCEA3", "#6D72E5", "#DB6DE5", "#F7A912"];

  const seriesWithColors = series
    ?.map((s, index) => {
      if (!s?.data || !s?.time || s.data.length !== s.time.length) return null;

      const dataWithTime = s.data.map((value, i) => ({
        y: value,
        x: new Date(s.time[i]).getTime(),
      }));

      return {
        ...s,
        data: dataWithTime,
        color: isCompare
          ? trackColors[index % trackColors.length]
          : series?.color,
      };
    })
    .filter(Boolean);

  const chartOptions = {
    chart: {
      type: "spline",
      scrollablePlotArea: {
        minWidth: 600,
        scrollPositionX: 1,
      },
    },
    title: {
      text: null,
      align: "right",
      enabled: false,
    },
    subtitle: {
      text: null,
      align: "left",
    },
    xAxis: {
      type: "datetime",
      visible: false,
    },
    legend: {
      align: "right",
      useHTML: true,
      labelFormatter: function () {
        return `<div style="font-family:'iranyekan',serif;font-size: 13px; direction: rtl;">
            ${shortener(this.name, 14)}
          </div>`;
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        formatter: function () {
          return toPersianNumber(this.value);
        },
      },
      minorGridLineWidth: 0,
      gridLineWidth: 1,
    },
    tooltip: {
      headerFormat: "",
      backgroundColor: "#efefef",
      textAlign: "center",
      useHTML: true,
      shadow: false,
      crosshairs: true,
      shared: true,
      formatter: function () {
        let tooltipHTML = `<div style="font-family:'iranyekan',serif;font-size: 12px; direction: rtl;">`;

        this.points.forEach((point) => {
          tooltipHTML += `<div style="display: flex; align-items: center; margin-bottom: 5px;">
              <div style="width: 10px; height: 10px; border-radius: 50%; background-color: ${
                point.color
              }; margin-left: 3px;"></div>
              <span>${shortener(point.series.name, 14)}:</span> 
              <span style="color: #333; margin-right: 5px;">${toPersianNumber(
                formatShortNumber(point.y),
              )}</span>
              </div>`;
        });

        const firstPointDate = new Date(this.points[0].x);
        const formattedFirstDate = firstPointDate
          .toLocaleDateString("fa-IR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/[\u200E]/g, "");

        tooltipHTML += `<div style="margin-top: 10px; text-align: center; color: #555;">${formattedFirstDate}</div>`;
        tooltipHTML += "</div>";
        return tooltipHTML;
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      spline: {
        lineWidth: 4,
        states: {
          hover: {
            lineWidth: 5,
          },
        },
        marker: {
          enabled: false,
        },
      },
    },
    series: isCompare ? seriesWithColors : series,
    navigation: {
      menuItemStyle: {
        fontSize: "10px",
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

ReleaseChart.propTypes = {
  series: PropTypes.array.isRequired,
  isCompare: PropTypes.bool,
};

export default ReleaseChart;
