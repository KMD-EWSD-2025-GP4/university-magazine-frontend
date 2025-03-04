import { type MRT_RowData, type MRT_TableOptions } from "mantine-react-table";

//define re-useable default table options for all tables in your app
export const getDefaultMRTOptions = <TData extends MRT_RowData>(): Partial<
  MRT_TableOptions<TData>
> => ({
  enableColumnActions: false,
  enableColumnFilters: false,
  enableSorting: false,
  enableHiding: false,
  enableDensityToggle: false,
  enableFullScreenToggle: false,
  enableGlobalFilter: false,
  mantineTableProps: {
    highlightOnHover: false,
    withRowBorders: true,
  },
  mantinePaginationProps: {
    showRowsPerPage: false,
  },
  manualFiltering: true,
});
