import {useMemo} from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

const CountryTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Country Name',
      },
      {
        accessorKey: 'abbreviation',
        header: 'Code',
      },
      {
        accessorKey: 'capital',
        header: 'Capital',
      },
      {
        accessorKey: 'phone',
        header: 'Ph Code',
      },
      {
        accessorKey: 'population',
        header: 'Population',
      },
      {
        accessorKey: 'media.flag',
        header: 'Flag',
        cell: info => <img src={info.getValue()} alt="flag" width="30" />,
      },
      {
        accessorKey: 'media.emblem',
        header: 'Emblem',
        cell: info =>
          info.getValue() ? <img src={info.getValue()} alt="emblem" width="30" /> : null,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="country-table">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CountryTable;
