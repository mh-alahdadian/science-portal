import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const SemiCircleDoughnut = ({
  name,
  showDataLabels = false,
  data = [],
  colors = [],
  tooltipFormatter,
  legendFormatter = () => {},
  titleFormatter = "Browser<br>shares<br>January<br>2022",
  height,
  width,
  colLayout = true,
  titleOffset = 0,
  minWidth = "19rem",
  maxWidth = "40rem",
}) => {
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height,
      ...(width ? { width } : {}),
    },

    plotOptions: {
      pie: {
        showInLegend: true,
        borderRadius: 15,
        borderWidth: 7,
        innerSize: "45%",
        dataLabels: {
          enabled: showDataLabels,
          distance: 20,
        },
        startAngle: -105,
        endAngle: 105,
        center: ["50%", "50%"],
        // size: "110%",
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
      text: titleFormatter,
      align: "center",
      verticalAlign: "middle",
      useHTML: true,
      y: titleOffset,
      style: {
        fontSize: "14px",
        color: "black",
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
        : {}),
      width: colLayout ? "100%" : "50%",
      height: "100%",
      rtl: true,
      x: 0,
      padding: 0,
      margin: -100,
    },
    series: [
      {
        type: "pie",
        name,
        colors,
        innerSize: "50%",
        data,
      },
    ],
  };

  return (
    <div className={`min-w-[${minWidth}] max-w-[${maxWidth}] w-full`}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SemiCircleDoughnut;
