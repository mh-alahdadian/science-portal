import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Doughnut = ({
  name = "",
  showDataLabels = false,
  data = [],
  colors = [],
  tooltipFormatter,
  legendFormatter,
  height,
  colLayout = false,
  customLayout = {},
  title,
  titleFontSize = 10,
  titleOffset,
  width,
  size = "110%",
  minWidth = "19rem",
  maxWidth = "40rem",
  legendHeight = "600px",
}) => {
  const options = {
    chart: {
      type: "pie",
      height,
      ...(width ? { width } : {}),
      backgroundColor: "transparent",
    },
    plotOptions: {
      pie: {
        showInLegend: true,
        borderRadius: 12,
        borderWidth: 4,
        innerSize: "50%",
        dataLabels: {
          enabled: showDataLabels,
          distance: 20,
        },
        center: ["50%", "50%"],
        size,
      },
      accessibility: {
        enabled: false,
      },
      showInLegend: true,
      series: {
        point: {
          events: {
            legendItemClick: function () {
              return false;
            },
          },
        },
        dataLabels: {},
        states: {
          hover: { halo: null },
          inactive: {
            opacity: 0.3,
          },
        },
      },
    },
    title: {
      text: title,
      align: "center",
      verticalAlign: "middle",
      y: titleOffset,
      style: {
        fontSize: `${titleFontSize}px`,
        color: "#00000080",
        fontFamily: "iranyekan",
        fontWeight: "bold",
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      headerFormat: "",
      backgroundColor: "#efefef",
      textAlign: "center",
      useHTML: true,
      shadow: false,
      formatter: tooltipFormatter,
    },
    legend: {
      labelFormatter: legendFormatter,
      useHTML: true,
      symbolHeight: 0,
      symbolWidth: 0,
      symbolRadius: 0,
      ...(!colLayout
        ? { layout: "vertical", verticalAlign: "middle", align: "right" }
        : customLayout),
      width: colLayout ? "100%" : "50%",
      height: legendHeight,
      rtl: true,
      x: 0,
      padding: 0,
      itemStyle: {
        overflow: "hidden", // Ensure no arrows are visible
      },
      itemMarginTop: 5,
      // itemMarginBottom: 5, // Space between legend items
      navigation: {
        enabled: false, // Disable navigation arrows
      },
    },
    series: [
      {
        name,
        data,
        colors,
      },
    ],
  };
  return (
    <div className={`min-w-[${minWidth}] max-w-[${maxWidth}] w-full`}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Doughnut;
