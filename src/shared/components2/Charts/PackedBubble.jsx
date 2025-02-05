import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
highchartsMore(Highcharts);

const PackedBubble = ({ data }) => {
  const options = {
    chart: {
      type: "packedbubble",
      height: "80%",
    },
    title: {
      text: null,
      enabled: false,
      align: "left",
    },
    tooltip: {
      useHTML: true,
      pointFormat: "<b>{point.name}:</b> {point.value}m CO<sub>2</sub>",
    },
    legend: { enabled: false },
    credits: {
      enabled: false,
    },
    plotOptions: {
      packedbubble: {
        minSize: "20%",
        maxSize: "200%",
        zMin: 0,
        zMax: 250,
        layoutAlgorithm: {
          gravitationalConstant: 0.05,
          splitSeries: true,
          seriesInteraction: false,
          dragBetweenSeries: false,
          parentNodeLimit: true
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          filter: {
            property: "y",
            operator: ">",
            value: 0,
          },
          style: {
            color: "black",
            textOutline: "none",
            fontWeight: "normal",
          },
        },
        draggable: true,
        tooltip: {
          headerFormat: "<div style='font-family:iranyekan'>{series.name}</div><br>",
          pointFormat: "<div style='font-family:iranyekan'>{point.name} <br /> {point.y}%</div>",
        },
      },
    },
    series: data,
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PackedBubble;
