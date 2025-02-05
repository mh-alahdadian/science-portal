import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BubbleChart = () => {
  const options = {
    chart: {
      type: "bubble",
      plotBorderWidth: 0,
      borderWidth: 0,
      zooming: {
        enabled: false,
      },
      height: "60%",
    },

    title: {
      text: null,
    },

    xAxis: {
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: "transparent",
      labels: {
        enabled: false,
      },
      minorTickLength: 0,
      tickLength: 0,
      gridLineWidth: 0,
      title: {
        text: null,
      },
      plotLines: [
        {
          color: "#949EB7",
          width: 2,
          value: 0,
          zIndex: 5,
        },
      ],
    },

    yAxis: {
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: "transparent",
      labels: {
        enabled: false,
      },
      minorTickLength: 0,
      tickLength: 0,
      gridLineWidth: 0,
      title: {
        text: null,
      },
      plotLines: [
        {
          color: "#949EB7",
          width: 2,
          value: 0,
          zIndex: 5,
        },
      ],
    },

    tooltip: {
      useHTML: true,
      headerFormat: "<table>",
      pointFormat:
        "<tr><th>{point.name}</th></tr>" +
        "<tr><th>تاثیرگذاری:</th><td>{point.x}</td></tr>" +
        "<tr><th>فراگیری:</th><td>{point.y}</td></tr>" +
        "<tr><th>اندازه:</th><td>{point.z}</td></tr>",
      footerFormat: "</table>",
    },

    legend: {
      enabled: false,
    },

    credits: {
      enabled: false,
    },

    series: [
      {
        name: "موج‌های افزایشی",
        data: [
          { x: 95, y: 95, z: 13.8, name: "موج A" },
          { x: 86.5, y: 102.9, z: 14.7, name: "موج B" },
        ],
        color: "#F60000",
        dataLabels: {
          enabled: true,
          format: "{point.name}", // Display the name of the bubble
          style: {
            color: "#000", // White text color
            textOutline: "none",
            fontSize: "12px", // Adjust the font size
          },
        },
      },
      {
        name: "موج‌های بالقوه",
        data: [
          { x: -80.8, y: 91.5, z: 15.8, name: "موج C" },
          { x: -80.4, y: 102.5, z: 12, name: "موج D" },
        ],
        color: "#E9A506",
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          style: {
            color: "#000",
            textOutline: "none",
            fontSize: "12px",
          },
        },
      },
      {
        name: "موج‌های تکراری",
        data: [
          { x: -80.3, y: -86.1, z: 11.8, name: "موج E" },
          { x: -78.4, y: -50.1, z: 18.6, name: "موج F" },
        ],
        color: "#00A184",
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          style: {
            color: "#000",
            textOutline: "none",
            fontSize: "12px",
          },
        },
      },
      {
        name: "موج‌های کاهشی",
        data: [
          { x: 74.2, y: -68.5, z: 14.5, name: "موج G" },
          { x: 73.5, y: -83.1, z: 10, name: "موج H" },
        ],
        color: "#1270F4",
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          style: {
            color: "#000",
            textOutline: "none",
            fontSize: "12px",
          },
        },
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BubbleChart;
