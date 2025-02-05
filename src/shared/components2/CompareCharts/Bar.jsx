import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import PropTypes from "prop-types";
import { toPersianNumber } from "utils/helper.js";

const ReusableChart = ({ category, data }) => {
  const categories = [
    "فرهنگی",
    "اجتماعی",
    "ورزشی",
    "سیاسی",
    "اقتصادی",
    "هنر و رسانه",
  ];
  const chartData = [
    {
      name: "نام اکانت اول",
      data: [387749, 280000, 129000, 64300, 54000, 34300],
      color: "#1DCEA2",
    },
    {
      name: "نام اکانت دوم",
      data: [45321, 20000, 9000, 140500, 19500, 123500],
      color: "#6D72E5",
    },
    {
      name: "نام اکانت سوم",
      data: [45321, 110000, 15000, 160500, 12500, 113500],
      color: "#DB6DE5",
    },
    {
      name: "نام اکانت چهارم",
      data: [45321, 190000, 23000, 100500, 24500, 193500],
      color: "#F7A912",
    },
  ];

  const chartOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "دسته‌بندی موضوعی",
      align: "right",
    },
    // subtitle: {
    //   text: 'Source: <a target="_blank" href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
    //   align: "left",
    // },
    xAxis: {
      categories: categories,
      crosshair: true,
      accessibility: {
        description: "Countries",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        formatter: function () {
          return toPersianNumber(this.value / 10000);
        },
      },
    },
    tooltip: {
      valueSuffix: " (10000 MT)",
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
      },
    },
    series: chartData,
  };

  return (
    <div className="w-[77.5rem] p-10">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

ReusableChart.propTypes = {
  category: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ReusableChart;
