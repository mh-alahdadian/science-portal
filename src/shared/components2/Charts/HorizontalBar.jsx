import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import PropTypes from "prop-types";
import { SpinnerGap } from "@phosphor-icons/react";
import { formatShortNumber, toPersianNumber } from "utils/helper.js";

const HorizontalBar = ({
  // data,
  colors,
  info = [],
  loading,
  categories,
  minWidth = "19rem",
  maxWidth = "40rem",
}) => {
  if (loading) {
    return (
      <div className="w-full h-40 flex justify-center items-center">
        <SpinnerGap size={40} className="animate-spin" />
      </div>
    );
  }

  if (info.length === 0) {
    return (
      <div className="w-full h-60 flex justify-center pt-4 items-center text-lg text-gray-600">
        داده ای برای نمایش وجود ندارد
      </div>
    );
  }

  const fixHashtag = (value) => {
    if (value.startsWith("#")) {
      return value.slice(1) + "#";
    }
    return value;
  };

  const seriesData = [
    {
      name: "سال 1403",
      data: info?.slice(0, 10).map((value, index) => ({
        y: value?.count ?? 0,
        color: colors[index % colors.length],
      })),
    },
  ];

  const chartOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: null,
      align: "right",
      enabled: false,
    },
    subtitle: {
      text: null,
    },
    xAxis: {
      labels: {
        formatter: function () {
          return fixHashtag(toPersianNumber(this.value));
        },
      },
      categories: categories,
      title: {
        text: null,
      },
      gridLineWidth: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: null,
        align: "right",
      },
      labels: {
        enabled: false,
        overflow: "justify",
      },
      gridLineWidth: 0,
    },
    tooltip: {
      enabled: true,
      formatter: function () {
        return `<strong>${fixHashtag(this.x)}</strong>: ${toPersianNumber(
          formatShortNumber(this.y),
        )}`;
      },
    },
    plotOptions: {
      bar: {
        borderRadius: "50%",
        dataLabels: {
          enabled: true,
          formatter: function () {
            return toPersianNumber(formatShortNumber(this.y));
          },
        },
        groupPadding: 0.1,
        colorByPoint: true,
        pointWidth: 30,
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: seriesData,
  };

  return (
    <div className={`min-w-[${minWidth}] max-w-[${maxWidth}] w-full`}>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

HorizontalBar.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  info: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number,
    }),
  ),
  loading: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
};

export default HorizontalBar;
