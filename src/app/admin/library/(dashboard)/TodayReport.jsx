import { useQuery } from '@tanstack/react-query';
import { queryService } from '@/api';

function TodayReport() {
  const { data } = useQuery({
    ...queryService('library:/v1/report/online/today/books', { scopeId: 0 }),
    initialData: [],
  });

  return (
    <>
      <div className="flex flex-col gap-6 w-2/4 h-80 rounded-xl shadow-md p-5" style={{ backgroundColor: '#2c2c2c' }}>
        <div className="flex justify-between items-center px-9 text-white">
          <p className="font-semibold text-lg">گزارش امروز</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex gap-3 w-full justify-center">
            <div className="flex flex-col items-center p-3 gap-3 bg-sand text-dark h-24 w-40 rounded-lg shadow-md">
              <p>کتاب‌های ثبت شده</p>
              <p className="font-bold text-xl">{data?.createCount}</p>
            </div>
            <div className="flex flex-col items-center p-3 gap-3 bg-sandals h-24 w-40 rounded-lg shadow-md">
              <p>تعداد کامنت‌ها</p>
              <p className="font-bold text-xl">{data?.commentCount}</p>
            </div>
          </div>
          <div className="flex gap-3 w-full justify-center">
            <div className="flex flex-col items-center p-3 gap-3 bg-ocean h-24 w-40 rounded-lg shadow-md">
              <p>تعداد دانلود‌ها</p>
              <p className="font-bold text-xl">{data?.downloadCount}</p>
            </div>
            <div className="flex flex-col items-center p-3 gap-3 bg-linen h-24 w-40 rounded-lg shadow-md">
              <p>کتاب‌های منتشر شده</p>
              <p className="font-bold text-xl">{data?.publishCount}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodayReport;
