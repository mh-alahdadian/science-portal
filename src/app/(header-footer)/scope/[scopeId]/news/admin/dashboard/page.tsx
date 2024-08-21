'use client';
import { CategoryScale, Chart as ChartJs, registerables } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import {
  allNewsStatistics,
  authorsNewsChartData,
  categoriesNewsChartData,
  commentsChartData,
  mostViewedNewsChartData,
  postsChartData,
} from './mockData';
import StatisticCard from './_components/StatisticCard';

ChartJs.register(CategoryScale);
ChartJs.register(...registerables);

const statisticColors = ['7BDFF2', 'B2F7EF', 'EFF7F6', 'F7D6E0', 'F2B5D4', 'ffa69e', 'b2ff9e', 'fcd29f']

export default function NewsDashboard() {
  const commonChartOptions = { scales: { y: { beginAtZero: true } } };
  return (
    <>
      <div className='flex gap-4 flex-wrap mb-8'>
        {allNewsStatistics.map((item, index) => (
          <StatisticCard title={item.title} count={item.count} color={statisticColors[index]} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h2>تعداد کل اخبار منتشر شده در ماه های اخیر</h2>
          <Line options={commonChartOptions} data={postsChartData} />
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h2>کامنت های ثبت شده (مشارکت کاربران)</h2>
          <Line options={commonChartOptions} data={commentsChartData} />
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h2>تعداد اخبار ثبت شده (آمار نویسنده ها)</h2>
          <Line options={commonChartOptions} data={authorsNewsChartData} />
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h2>ده خبر پر بازدید ماه اخیر</h2>
          <Bar options={commonChartOptions} data={mostViewedNewsChartData} />
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-6 col-span-2">
          <h2>اخبار منتشر شده هر دسته (یک ماه اخیر)</h2>
          <Line options={commonChartOptions} data={categoriesNewsChartData} />
        </div>
      </div>
    </>
  );
}
