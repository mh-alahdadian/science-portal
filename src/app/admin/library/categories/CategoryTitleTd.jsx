import { useState } from 'react';

function CategoryTitleTd({ row, getValue }) {
  const [showFullName, setShowFullName] = useState(false);

  const value = getValue() || `${row.original.firstName} ${row.original.lastName}`;

  return (
    <div className="relative flex items-center">
      <div className="relative flex overflow-hidden" style={{ flex: '20' }}>
        <div
          className="flex items-center justify-start flex-nowrap"
          style={{ maxWidth: '16rem' }}
          onMouseEnter={() => setShowFullName(true)}
          onMouseLeave={() => setShowFullName(false)}
        >
          <p className="text-nowrap">{value}</p>
        </div>
      </div>
      {value.length > 60 && <p className="flex-1 left-0">...</p>}
      {showFullName && value.length > 60 && (
        <div className="absolute right-full bg-white rounded-md shadow-sm p-3 z-30 top-0 w-max max-w-96">
          <p>{value}</p>
        </div>
      )}
    </div>
  );
}

export default CategoryTitleTd;
