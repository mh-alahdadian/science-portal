import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  parseNumber,
  parseTimeToPersian,
  toPersianNumber,
} from "utils/helper.js";
import { useLayoutContext } from "context/layout-context.jsx";
import useSearchStore from "store/searchStore.js";

const Areaspline = ({ data, cat, time_gap }) => {
  const [num, setNum] = useState(0);
  const { isFilterListOpen } = useSearchStore();

  const { isSidebarOpened } = useLayoutContext();
  useEffect(() => {
    setTimeout(() => {
      setNum((l) => l + 1);
    }, 120);
  }, [isSidebarOpened, isFilterListOpen]);
  const options = {
    chart: {
      type: "areaspline",
      height: 351,
    },
    tooltip: {
      headerFormat: "",
      backgroundColor: "#efefef",
      textAlign: "center",
      useHTML: true,
      shadow: false,
      formatter: function () {
        switch (time_gap) {
          case "hour":
            return `<div style="display:flex;flex-direction:column;gap:8px;padding:4px;font-family:iranyekan,serif;font-size:12px">
        <div style="display:flex;justify-content: space-between;"><span>${toPersianNumber(
          this.y,
        )}</span><span>تعداد محتوا</span></div>
        <div style="display:flex;justify-content: space-between;gap:16px"><div style="display:flex;gap:4px"><span>${
          parseTimeToPersian(this.x).split(" - ")[1]
        }</span><span>:تاریخ</span></div><div style="display:flex;gap:4px"><span>${parseTimeToPersian(
          this.x,
        )
          .split(" - ")[0]
          .slice(0, -3)}</span><span>:ساعت</span></div></div>
        </div>`;
          case "day":
            return `<div style="display:flex;flex-direction:column;gap:8px;padding:4px;font-family:iranyekan,serif;font-size:12px">
            <div style="display:flex;justify-content: space-between;"><span>${toPersianNumber(
              this.y,
            )}</span><span>تعداد محتوا</span></div>
            <div style="display:flex;justify-content:space-between"><div style="display:flex;gap:16px"><span>${
              parseTimeToPersian(this.x).split(" - ")[1]
            }</span><span>:تاریخ</span></div></div>
            </div>`;
          case "week":
            return `<div style="display:flex;flex-direction:column;gap:8px;padding:4px;font-family:iranyekan,serif;font-size:12px">
            <div style="display:flex;justify-content: space-between;"><span>${toPersianNumber(
              this.y,
            )}</span><span>تعداد محتوا</span></div>
            <div style="display:flex;justify-content:space-between"><div style="display:flex;gap:16px"><span>${
              parseTimeToPersian(this.x).split(" - ")[1]
            }</span><span>:از تاریخ</span></div></div>
            <div style="display:flex;justify-content:space-between"><div style="display:flex;gap:16px"><span>${
              parseTimeToPersian(cat[cat.indexOf(this.x) + 1]).split(
                " - ",
              )[1] ||
              new Date()
                .toLocaleDateString("fa-IR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .replaceAll("/", "٫")
            }</span><span>:تا تاریخ</span></div></div>
            </div>`;
        }
      },
    },
    plotOptions: {
      areaspline: {
        center: ["50%", "50%"],
        size: "100%",
        color: "#4D36BF",
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "#814CEB30"],
            [1, "#814CEB00"],
          ],
        },
        marker: {
          lineWidth: 0.1,
          lineColor: null,
          fillColor: "#4D36BF",
        },
      },
    },
    title: {
      enabled: false,
      text: "",
      align: "center",
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: cat,
      tickWidth: 0,
      labels: {
        formatter: function () {
          switch (time_gap) {
            case "hour":
              return `<div style="font-family:iranyekan,serif;font-size:10px">${parseTimeToPersian(
                this.value,
              )
                .split(" - ")[0]
                .slice(0, -3)}</div>`;
            case "day":
              return `<div style="font-family:iranyekan,serif;font-size:10px">${
                parseTimeToPersian(this.value).split(" - ")[1]
              }</div>`;
            case "week":
              return `<div style="font-family:iranyekan,serif;font-size:10px">${
                parseTimeToPersian(this.value).split(" - ")[1]
              }</div>`;
          }
        },
      },
    },
    yAxis: {
      title: {
        text: "",
        enabled: false,
      },
      labels: {
        formatter: function () {
          return `<div style="font-family:iranyekan,serif;font-size:10px">${parseNumber(
            this.value,
          )}</div>`;
        },
      },
    },

    series: [
      {
        name: "روند انتشار",
        data,
      },
    ],
  };
  return (
    <HighchartsReact highcharts={Highcharts} options={options} key={num} />
  );
};

export default Areaspline;
