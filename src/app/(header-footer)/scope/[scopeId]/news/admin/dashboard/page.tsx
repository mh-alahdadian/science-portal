'use client';
import { CategoryScale, Chart as ChartJs, registerables } from 'chart.js';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock'
import { useSuspenseQuery } from '@tanstack/react-query';
import { queryService } from '@/api';
import { useEffect, useRef, useState } from 'react';
import { formatDateTime } from '@service/utils';

export default function NewsDashboard({ params }: PageProps<'scopeId'>) {
  const chartRef = useRef(null)
  const [allNewsPerMonth, setAllNewsPerMonth] = useState({
    series: [{
      name: 'تعداد اخبار',
      data: [],
    }],
    xAxis: {
      categories: []
    },
    yAxis: {
      min: 0
    },
    rangeSelector: {
      enabled: false,
    },
    navigator: {
      enabled: false
    },
    
  })
  const [allCommentsPerMonth, setAllCommentsPerMonth] = useState({
    series: [{
      name: 'تعداد کامنت ها',
      data: [],
    }],
    xAxis: {
      categories: []
    },
    yAxis: {
      min: 0
    },
    rangeSelector: {
      enabled: false,
    },
    navigator: {
      enabled: false
    },
  })
  const [allNewsPerDay, setAllNewsPerDay] = useState({
    series: [{
      name: 'تعداد اخبار',
      data: [],
    }],
    xAxis: {
      categories: []
    },
    yAxis: {
      min: 0
    },
    rangeSelector: {
      enabled: false,
    },
    navigator: {
      enabled: false
    },
  })
  const [allCommentsPerDay, setAllCommentsPerDay] = useState({
    series: [{
      name: 'تعداد کامنت ها',
      data: [],
    }],
    xAxis: {
      categories: []
    },
    yAxis: {
      min: 0
    },
    rangeSelector: {
      enabled: false,
    },
    navigator: {
      enabled: false
    },
  })

  const dailyPostsReport = useSuspenseQuery({
    ...queryService('news:/v1/report/daily/posts',
      { params: { query: { scopeId: 1, length: 30 } } }
    )
  }).data

  const monthlyPostsReport = useSuspenseQuery({
    ...queryService('news:/v1/report/monthly/posts',
      { params: { query: { scopeId: 1, length: 12 } } }
    )
  }).data

  useEffect(() => {
    const newsCounts = monthlyPostsReport.map(item => item.createCount)
    const monthTitles = monthlyPostsReport.map(item => item.monthTitle)
    const commentsCount = monthlyPostsReport.map(item => item.commentCount)
    setAllNewsPerMonth({
      ...allNewsPerMonth,
      xAxis: {
        categories: monthTitles
      },
      series: [{
        data: newsCounts
      }]
    }
    )

    setAllCommentsPerMonth({
      ...allCommentsPerMonth,
      xAxis: {
        categories: monthTitles
      },
      series: [{
        data: commentsCount
      }]
    }
    )
  }, [monthlyPostsReport])

  useEffect(() => {
    const newsCounts = dailyPostsReport.map(item => item.createCount)
    const newsDays = dailyPostsReport.map(item => formatDateTime(item.date || "").split(",")[0])
    const commentsCount = dailyPostsReport.map(item => item.commentCount)

    setAllNewsPerDay({
      ...allNewsPerDay,
      xAxis: {
        categories: newsDays
      },
      series: [{
        data: newsCounts
      }]
    }
    )

    setAllCommentsPerDay({
      ...allCommentsPerDay,
      xAxis: {
        categories: newsDays
      },
      series: [{
        data: commentsCount
      }]
    }
    )
  }, [dailyPostsReport])

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2>تعداد کل اخبار منتشر شده در ماه های اخیر</h2>
        <HighchartsReact
        ref={chartRef}
          highcharts={Highcharts}
          options={allNewsPerMonth}
          constructorType={"stockChart"}
        />
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2>کامنت های ثبت شده در ماه های اخیر (مشارکت کاربران)</h2>
        <HighchartsReact
          highcharts={Highcharts}
          options={allCommentsPerMonth}
          constructorType={"stockChart"}
        />
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2>تعداد کل اخبار منتشر شده در هر روز</h2>
        <HighchartsReact
          highcharts={Highcharts}
          options={allNewsPerDay}
          constructorType={"stockChart"}
        />
      </div>
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2>تعداد کل کامنت های ثبت شده در هر روز</h2>
        <HighchartsReact
          highcharts={Highcharts}
          options={allNewsPerDay}
          constructorType={"stockChart"}
        />
      </div>
    </div>
  );
}
