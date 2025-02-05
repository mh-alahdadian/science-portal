import Divider from "components/ui/Divider";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import timeline from "highcharts/modules/timeline";
import ReactDOMServer from "react-dom/server";
import { toPersianNumber } from "utils/helper";

timeline(Highcharts);

const CustomLabel = ({ point }) => (
  <div
    style={{
      borderRadius: "8px",
      padding: "7px",
      fontFamily: "iranyekan",
      background: "#ffffff",
      width: "300px",
      direction: "rtl",
    }}
  >
    <h4
      style={{
        padding: "0 0 8px 0",
        fontSize: "16px",
        color: "#333",
        textAlign: "right",
      }}
    >
      {toPersianNumber(point.name)}
    </h4>
    <Divider />
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "5px",
        gap: "9px",
      }}
    >
      <div
        style={{
          borderRadius: "50%",
          background: "#000",
          width: "35px",
          height: "35px",
        }}
      ></div>
      <div style={{ display: "grid", textAlign: "right" }}>
        <span style={{ fontWeight: "bold", fontSize: "14px" }}>
          نام اکانت توییتر
        </span>
        <span style={{ fontSize: "12px", color: "gray" }}>
          {point.username}
        </span>
      </div>
    </div>
    <p
      style={{
        fontSize: "12px",
        color: "#555",
        marginTop: "10px",
        textAlign: "right",
      }}
    >
      {toPersianNumber(point.description)}
    </p>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          color: "gray",
          marginTop: "5px",
          textAlign: "right",
        }}
      >
        <span>{toPersianNumber(point.timestamp)}</span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          fontSize: "12px",
          color: "#888",
        }}
      >
        <p style={{ display: "flex", alignItems: "center", gap: "3px" }}>
          <span>{toPersianNumber(point.comments)}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={23}
            height={25}
            viewBox="0 0 24 24"
            fill={"#54ADEE"}
          >
            <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
          </svg>
        </p>
        <p style={{ display: "flex", alignItems: "center", gap: "3px" }}>
          <span>{toPersianNumber(point.likes)}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={23}
            height={23}
            viewBox="0 0 24 24"
            fill={"#E0526A"}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>{" "}
        </p>
      </div>
    </div>
  </div>
);

const TimeLine = ({ text = null, subtitle = null }) => {
  const dataWithLabels = [
    {
      name: "شروع موج",
      description: "تست تست تست تست تست تست تست",
      username: "@user1",
      timestamp: "1402/11/01",
      likes: "2.5k",
      comments: "324",
    },
    {
      name: "اولین اوج‌گیری",
      description: "تست تست تست تست تست تست تست",
      username: "@user2",
      timestamp: "1402/11/02",
      likes: "1.1k",
      comments: "100",
    },
    {
      name: "بزرگ‌ترین اوج",
      description: "تست تست تست تست تست تست تست",
      username: "@user2",
      timestamp: "1402/11/02",
      likes: "1.1k",
      comments: "100",
    },
    {
      name: "آخرین اوج‌گیری",
      description: "تست تست تست تست تست تست تست",
      username: "@user2",
      timestamp: "1402/11/02",
      likes: "1.1k",
      comments: "100",
    },
    {
      name: "پایان موج",
      description: "تست تست تست تست تست تست تست",
      username: "@user2",
      timestamp: "1402/11/02",
      likes: "1.1k",
      comments: "100",
    },
  ].map((point) => ({
    ...point,
    dataLabelHTML: ReactDOMServer.renderToString(<CustomLabel point={point} />),
  }));

  const options = {
    chart: {
      type: "timeline",
    },
    accessibility: {
      enabled: false,
    },
    xAxis: {
      visible: false,
    },
    credits: {
      enabled: false,
    },
    yAxis: {
      visible: false,
    },
    title: {
      text,
    },
    tooltip: {
      enabled: false,
    },
    subtitle: {
      text: subtitle,
    },
    colors: ["#B4ABE34D", "#5133E44D", "#432FA7", "#5133E44D", "#B4ABE34D"],
    series: [
      {
        data: dataWithLabels,
        dataLabels: {
          useHTML: true,
          formatter: function () {
            return this.point.dataLabelHTML;
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

export default TimeLine;
