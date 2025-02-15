import { Warning } from '@phosphor-icons/react';
import { useState } from 'react';
import { Dialog } from '../Dialog';

export function ReportButton() {
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <div className="relative inline-block">
      <button className="flex items-center text-gray-500 hover:text-gray-700 " onClick={() => setShowReportModal(true)}>
        <span className="ml-1 text-sm">گزارش تخلف</span>
        <Warning size={18} />
      </button>

      {showReportModal && (
        <Dialog open={showReportModal} onClose={() => setShowReportModal(false)}>
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">گزارش تخلف</h2>
            <p className="mb-4">
              آیا از گزارش تخلف برای کاربر "<b>شیشتقلالی منتظر</b>" برای ثبت نظر "
              <b>پرسپولیس با اختلاف بهترین تیم ایران در ده سال گذشته بوده...</b>" مطمئن هستید؟
            </p>

            <form>
              <label className="block mb-2 font-medium">نوع تخلف</label>
              <select className="w-full p-2 border rounded mb-4">
                <option value="7">توهین</option>
                <option value="8">سیاسی</option>
                <option value="9">اسپم</option>
                <option value="10">کلمات رکیک</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  خیر منصرف شدم
                </button>
                <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  بله مطمئنم
                </button>
              </div>
            </form>
          </div>
        </Dialog>
      )}
    </div>
  );
}
