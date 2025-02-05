import { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Treemap from "highcharts/modules/treemap";
import { toPersianNumber } from "utils/helper.js";
Treemap(Highcharts);

const TreeMap = ({ treeData, handleClick }) => {
  const options = {
    chart: {
      type: "treemap",
      height: "334px",
      width: null,
    },
    tooltip: {
      headerFormat: "",
      backgroundColor: "#efefef",
      textAlign: "center",
      useHTML: true,
      shadow: false,
      formatter: function () {
        return `<div style="display:flex;gap:8px;padding:4px;font-family:iranyekan,serif;font-size:12px"> 
                <span>${toPersianNumber(this.x)}</span><span>:${this.key}</span>
        </div>`;
      },
    },
    breadcrumbs: {
      // useHTML: true,
      showFullPath: true,
      events: {
        click: function (event) {
          setTimeout(() => {
            if (event.newLevel === 0) {
              handleClick({
                type: "parent",
                id: -1,
                name: "all",
              });
            }
          }, 100);
        },
      },
    },
    series: [
      {
        name: "خوشه ها",
        type: "treemap",
        layoutAlgorithm: "squarified",
        allowDrillToNode: true,
        animationLimit: 1000,
        colorByPoint: true,
        dataLabels: {
          enabled: false,
        },
        levels: [
          {
            level: 1,
            layoutAlgorithm: "sliceAndDice",
            dataLabels: {
              enabled: true,
              style: {
                fontSize: "14px",
                color: "white",
                fontFamily: "iranyekan",
                textOutline: "none",
                width: "100%",
                height: "100%",
              },
            },
            borderWidth: 3,
            levelIsConstant: false,
          },
          {
            level: 1,
            dataLabels: {
              style: {
                fontSize: "14px",
                color: "white",
                fontFamily: "iranyekan",
                textOutline: "none",
              },
            },
          },
        ],
        accessibility: {
          exposeAsGroupOnly: true,
        },

        data: treeData,
      },
    ],
    subtitle: {
      text: null,
    },
    title: {
      text: null,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        events: {
          click: function (event) {
            if (event.point.id.split("_").length === 2) {
              handleClick({
                type: "parent",
                id: event.point.id.split("_")[1],
                name: event.point.name,
              });
            } else if (event.point.id.split("_").length === 3) {
              handleClick({
                type: "child",
                id: event.point.id.split("_")[2],
                parentId: event.point.id.split("_")[1],
                name: event.point.name,
              });
            }
          },
        },
      },
    },
  };

  // Resize chart on window resize
  useEffect(() => {
    const handleResize = () => {
      if (Highcharts.charts[0]) {
        Highcharts.charts[0].reflow();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default TreeMap;
