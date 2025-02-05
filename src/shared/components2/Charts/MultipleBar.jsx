import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import PropTypes from "prop-types";
import { useCompareStore } from "store/compareStore";
import { useEffect, useState } from "react";
import { shortener, toPersianNumber } from "utils/helper.js";

const MultipleBar = ({
  categories = [],
  data = [],
  total = [],
  colors = ["#1DCEA2", "#6D72E5", "#DB6DE5", "#F7A912"],
  groupPadding,
  compareType,
}) => {
  const [num, setNum] = useState(0);
  const { fields } = useCompareStore((state) => state.compare);

  const fieldsCleared = fields.filter((value) =>
    compareType === "profile" ? value.id || value?.user_id : value.q,
  );

  const transformedData = fieldsCleared.map((field, index) => ({
    name: shortener(field.q || field.name || field.user_name, 12),
    data: data?.[index]?.map((item) =>
      parseFloat(((item.count / total[index]) * 100).toFixed(2)),
    ),
    color: colors[index],
  }));

  const chartOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: null,
    },
    legend: {
      align: "right",
      useHTML: true,
      labelFormatter: function () {
        return `<div style="font-family:'iranyekan',serif;font-size: 13px; direction: rtl;">
            ${shortener(this.name, 12)}
          </div>`;
      },
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories,
      crosshair: true,
      accessibility: {
        description: "categories",
      },
      labels: {
        style: {
          fontWeight: "600",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        formatter: function () {
          return toPersianNumber(this.value);
        },
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      useHTML: true,
      style: {
        fontFamily: "IranYekan",
      },
      formatter: function () {
        let tooltipHTML = `<div style="font-family:'iranyekan',serif;font-size: 11px; direction: rtl;">`;
        this.points.forEach((point) => {
          tooltipHTML += `
            <div style="display: flex; align-items: center; margin-bottom: 5px;">
              <div style="width: 10px; height: 10px; border-radius: 50%; background-color: ${
                point.color
              }; margin-left: 3px;"></div>
              <strong style="color: #333; margin-right: 5px;">${toPersianNumber(
                point.y,
              )}%</strong>
            </div>`;
        });
        tooltipHTML += "</div>";
        return tooltipHTML;
      },
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        groupPadding: groupPadding !== undefined ? groupPadding : 0.2,
        borderWidth: 0,
      },
      series: {
        enableMouseTracking: true,
        borderRadius: {
          radius: 8,
        },
      },
    },
    series: transformedData,
  };

  useEffect(() => {
    setNum((l) => l + 1);
  }, [fields]);

  return (
    <div className="w-full">
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        key={num}
      />
    </div>
  );
};

MultipleBar.propTypes = {
  categories: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  colors: PropTypes.array,
  total: PropTypes.array,
  compareType: PropTypes.string,
  groupPadding: PropTypes.number,
  platform: PropTypes.string,
};

export default MultipleBar;
