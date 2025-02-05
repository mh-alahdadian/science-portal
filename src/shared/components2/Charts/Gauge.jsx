import GaugeChart from "react-gauge-chart";

const Gauge = ({percent}) => {
  return (
    <GaugeChart
      style={{ width: "96px", height: "48px" }}
      nrOfLevels={3}
      colors={["#EE7575", "#DDDF0D", "#1CB0A5"]}
      arcWidth={0.3}
      percent={0.5}
      hideText={true}
    />
  );
};

export default Gauge;
