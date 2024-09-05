'use client';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock'
import { useSuspenseQuery } from '@tanstack/react-query';
import { queryService } from '@/api';
import { useMemo } from 'react';
import { formatDateTime } from '@service/utils';

const commonChartData = {
  yAxis: {
    min: 0
  },
  rangeSelector: {
    enabled: false,
  },
  navigator: {
    enabled: false
  },
}

export default function NewsDashboard({ params }: PageProps<'scopeId'>) {

  const dailyPostsReport = useSuspenseQuery(
    queryService('news:/v1/report/daily/posts',
      { params: { query: { scopeId: +params.scopeId } } }
    )
  ).data

  const monthlyPostsReport = useSuspenseQuery(
    queryService('news:/v1/report/monthly/posts',
      { params: { query: { scopeId: +params.scopeId } } }
    )
  ).data

  const { allNewsPerMonth, allCommentsPerMonth, monthTitles } = useMemo(() => {
    const newsCounts = monthlyPostsReport.map(item => item.publishCount)
    const monthTitles = monthlyPostsReport.map(item => item.monthTitle)
    const commentsCount = monthlyPostsReport.map(item => item.commentCount)

    return {
      allNewsPerMonth: newsCounts,
      allCommentsPerMonth: commentsCount,
      monthTitles: monthTitles
    }
  }, [monthlyPostsReport])

  const { allNewsPerDay, allCommentsPerDay, dayTitles } = useMemo(() => {
    const newsCounts = dailyPostsReport.map(item => item.publishCount)
    const newsDays = dailyPostsReport.map(item => formatDateTime(item.date || "").split(",")[0])
    const commentsCount = dailyPostsReport.map(item => item.commentCount)

    return {
      allNewsPerDay: newsCounts,
      allCommentsPerDay: commentsCount,
      dayTitles: newsDays
    }
  }, [dailyPostsReport])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2>تعداد کل اخبار منتشر شده در ماه های اخیر</h2>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            ...commonChartData,
            xAxis: {
              type: "category",
              categories: monthTitles,
            },
            series: [{
              data: allNewsPerMonth
            }]
          }}
          constructorType={"stockChart"}
        />
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2>کامنت های ثبت شده در ماه های اخیر (مشارکت کاربران)</h2>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            ...commonChartData,
            xAxis: {
              type: 'category',
              categories: monthTitles,
            },
            series: [{
              name: "تعداد کامنت ها",
              data: allCommentsPerMonth
            }]
          }}
          constructorType={"stockChart"}
        />
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2>تعداد کل اخبار منتشر شده در هر روز</h2>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            ...commonChartData,
            xAxis: {
              type: 'category',
              categories: dayTitles,
            },
            series: [{
              name: "تعداد کامنت ها",
              data: allNewsPerDay
            }]
          }}
          constructorType={"stockChart"}
        />
      </div>
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2>تعداد کل کامنت های ثبت شده در هر روز</h2>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            ...commonChartData,
            xAxis: {
              type: 'category',
              categories: dayTitles,
            },
            series: [{
              name: "تعداد کامنت ها",
              data: allCommentsPerDay
            }]
          }}
          constructorType={"stockChart"}
        />
      </div>
    </div>
  );
}
