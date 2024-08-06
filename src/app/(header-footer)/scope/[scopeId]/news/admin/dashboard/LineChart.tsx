import {Line} from "react-chartjs-2"
import {Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from "chart.js"
import { postsChartData } from "./mockData"
export default function LineChart() {
    
    return (
        <>
            <Line options={{}} data={postsChartData}/>
        </>
    )
}