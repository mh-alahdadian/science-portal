import { Line } from 'react-chartjs-2';
import { postsChartData } from './mockData';
export default function LineChart() {
  return (
    <>
      <Line options={{}} data={postsChartData} />
    </>
  );
}
