import { GridOptions } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { useParams } from 'next/navigation';

const autoSizeStrategy: GridOptions['autoSizeStrategy'] = {
  type: 'fitGridWidth',
  defaultMinWidth: 100,
  columnLimits: [
    {
      colId: 'country',
      minWidth: 900,
    },
  ],
};

export function DataGrid(props: AgGridReactProps) {
  const params = useParams();
  const myTheme = params.scopeId ? 'ag-theme-quartz-dark' : 'ag-theme-quartz';

  return (
    <AgGridReact editType="fullRow" enableRtl autoSizeStrategy={autoSizeStrategy} className={'ag-theme-quartz-dark'} {...props} />
  );
}
