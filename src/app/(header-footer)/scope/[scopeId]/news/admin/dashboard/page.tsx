'use client'
import { authorsNewsChartData, commentsChartData, postsChartData } from "./mockData";
import { Line } from "react-chartjs-2"
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, registerables } from "chart.js"

ChartJs.register(CategoryScale);
ChartJs.register(...registerables);

export default function NewsDashboard() {
    return (
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white shadow-xl rounded-2xl p-6">
                <h2>تعداد کل اخبار منتشر شده در ماه های اخیر</h2>
                <Line options={{}} data={postsChartData} />
            </div>
            
            <div className="bg-white shadow-xl rounded-2xl p-6">
                <h2>کامنت های ثبت شده (مشارکت کاربران)</h2>
                <Line options={{}} data={commentsChartData} />
            </div>

            <div className="bg-white shadow-xl rounded-2xl p-6">
                <h2>تعداد اخبار ثبت شده (آمار نویسنده ها)</h2>
                <Line options={{}} data={authorsNewsChartData} />
            </div>
        </div>
        
    )
}