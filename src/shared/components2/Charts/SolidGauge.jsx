import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";

highchartsMore(Highcharts);
solidGauge(Highcharts);

const SolidGauge = () => {
  const options = {
    chart: {
      type: "solidgauge",
      width: 50,
      hieght: 50,
    },
    title: null,
    pane: { 
      center: ["50%", "50%"],
      size: "100%",
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: "#EEE",
        innerRadius: "60%",
        outerRadius: "100%",
        shape: "arc",
      },
    },
    exporting: {
      enabled: false,
    },

    tooltip: {
      enabled: false,
    },

    series: [
      {
        name: "Speed",
        data: [0.5],
        dataLabels: {
          format:
            '<div style="text-align:center">' +
            '<span style="font-size:25px">{y}</span><br/>' +
            "</div>",
        },
      },
    ],
    yAxis: {
      min: 0,
      max: 1,
      title: null,
      stops: [
        [0, "#DDDF0D"], 
        [1, "#1CB0A5"], 
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 0.1,
      labels: {
        y: 16,
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      solidgauge: {
        dataLabels: null,
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SolidGauge;
