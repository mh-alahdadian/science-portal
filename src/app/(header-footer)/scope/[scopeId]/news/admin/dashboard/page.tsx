'use client';
import { CategoryScale, Chart as ChartJs, registerables } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import {
  authorsNewsChartData,
  categoriesNewsChartData,
  commentsChartData,
  mostViewedNewsChartData,
  postsChartData,
} from './mockData';

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
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2>ده خبر پر بازدید ماه اخیر</h2>
        <Bar options={{}} data={mostViewedNewsChartData} />
      </div>
      <div className="bg-white shadow-xl rounded-2xl p-6 col-span-2">
        <h2>اخبار منتشر شده هر دسته (یک ماه اخیر)</h2>
        <Line options={{}} data={categoriesNewsChartData} />
      </div>
    </div>
  );
}
