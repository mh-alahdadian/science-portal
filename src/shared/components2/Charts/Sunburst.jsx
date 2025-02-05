import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import sunburst from "highcharts/modules/sunburst";
import { fixPercentToShow } from "utils/helper";
sunburst(Highcharts);

const Sunburst = ({ data }) => {
  const options = {
    chart: {
      height: 430,
    },
    legend: { enabled: false },
    credits: {
      enabled: false,
    },
    plotOptions: {
      sunburst: {
        showInLegend: true,
        borderRadius: 0,
        borderWidth: 1,
        innerSize: "20%",
        //   dataLabels: {
        //     enabled: showDataLabels,
        //   },
        center: ["50%", "50%"],
        // size: "100%",
      },
      showInLegend: false,
      series: {
        point: {
          events: {
            legendItemClick: function () {
              return false;
            },
          },
        },
        dataLabels: {
          style: {
            // textOutline: "none",
            "stroke-width": 1,
          },
        },
        states: {
          hover: { halo: null },
          inactive: {
            opacity: 0.3,
          },
        },
      },
    },
    // Let the center circle be transparent
    // colors: Highcharts.getOptions().colors.reverse(),
    colors: [
      "#BCC3FD",
      "#87D7F0",
      "#47DBB6",
      "#FF868B",
      "#4EA1FA",
      "#A6F377",
      "#FF9EEF",
      "#BEA4F4",
      "#ab8bee",
      "#8b61e3",
    ],
    title: {
      text: null,
    },

    subtitle: {
      text: null,
    },

    series: [
      {
        type: "sunburst",
        data: [{ id: "0.0", parent: "", name: "دسته‌بندی موضوعی" }, ...data],
        name: "دسته‌بندی",
        allowDrillToNode: true,
        borderRadius: 3,
        cursor: "pointer",
        levels: [
          {
            level: 1,
            levelIsConstant: false,
            dataLabels: {
              filter: {
                property: "outerArcLength",
                operator: ">",
                value: 64,
              },
            },
          },
          {
            level: 2,
            colorByPoint: true,
          },
          {
            level: 3,
            colorVariation: {
              key: "brightness",
              to: -0.5,
            },
          },
          {
            level: 4,
            colorVariation: {
              key: "brightness",
              to: 0.5,
            },
          },
        ],
      },
    ],

    tooltip: {
      useHTML: true,
      formatter: function () {
        return `<div style="display:flex;flex-direction:column;gap:8px;text-align:center;font-family:iranyekan"><div>${
          this.key
        }</div><div>${fixPercentToShow(String(this.point.value))}</div></div>`;
      },
    },
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Sunburst;
