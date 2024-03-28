import { useThemeName } from '@/utils/scope';
import { GridOptions } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
// import 'ag-grid-enterprise';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';

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
  const myTheme = {
    light: 'ag-theme-quartz',
    dark: 'ag-theme-quartz-dark',
  }[useThemeName()];

  return (
    <AgGridReact
      editType="fullRow"
      // rowModelType="serverSide"
      enableRtl
      suppressRowVirtualisation
      suppressColumnVirtualisation
      autoSizeStrategy={autoSizeStrategy}
      className={myTheme}
      {...props}
    />
  );
}
