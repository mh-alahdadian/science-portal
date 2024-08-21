import { identical } from "ramda";

export const postsChartData = {
  labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
  datasets: [
    {
      label: 'تعداد پست ها',
      data: [100, 150, 110, 200, 250, 300],
      borderColor: '#0072bc',
    },
  ],
};

export const commentsChartData = {
  labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
  datasets: [
    {
      label: 'تعداد کامنت ها',
      data: [300, 280, 288, 310, 360, 400],
      borderColor: '#ff1515',
    },
  ],
};

export const authorsNewsChartData = {
  labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
  datasets: [
    {
      label: 'بروس لی',
      data: [30, 28, 28, 31, 36, 40],
      borderColor: '#0072bc',
    },
    {
      label: 'جکی چان',
      data: [80, 80, 66, 53, 58, 69],
      borderColor: '#ff1515',
    },
    {
      label: 'آرنولد شوارتزنگر',
      data: [180, 161, 110, 148, 164, 180],
      borderColor: '#44ff44',
    },
  ],
};

export const mostViewedNewsChartData = {
  labels: [
    'کناره گیری جو بایدن',
    'ریاست جمهوری پزشکیان',
    'معرفی chatgpt4',
    'طرح لو رفته iphone15',
    'عروسی پرخرج میلیاردر هندی',
  ],
  datasets: [
    {
      label: 'تعداد بازدید',
      backgroundColor: 'rgba(0, 255, 0, 0.2)',
      borderColor: 'rgb(0, 255, 0)',
      borderWidth: 1,
      data: [1200, 1200, 1900, 1300, 1500],
    },
  ],
};

export const categoriesNewsChartData = {
  labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
  datasets: [
    {
      label: 'عمومی',
      data: [300, 280, 288, 310, 360, 400],
      borderColor: '#0072bc',
    },
    {
      label: 'سیاسی',
      data: [360, 260, 244, 397, 421, 512],
      borderColor: '#ff0000',
    },
    {
      label: 'تکنولوژی',
      data: [160, 200, 144, 197, 121, 112],
      borderColor: '#00ff00',
    },
    {
      label: 'پزشکی',
      data: [60, 63, 54, 87, 91, 72],
      borderColor: '#ff00ff',
    },
  ],
};

export const allNewsStatistics = [
  {
    id: 1,
    title: "کل اخبار منتشر شده",
    count: 1814
  },
  {
    id: 2,
    title: "پیش نویس",
    count: 144
  },
  {
    id: 3,
    title: "در انتظار اصلاح",
    count: 37
  },
  {
    id: 4,
    title: "در انتظار انتشار",
    count: 19
  },
  {
    id: 5,
    title: "منتشر شده",
    count: 1814
  },
  {
    id: 6,
    title: "منتشر نشده",
    count: 200
  },
  {
    id: 7,
    title: "تعداد کل کامنت ها",
    count: 2096
  },
]