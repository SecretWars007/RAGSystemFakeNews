import type { TableProps } from "./Table.types";

export default function Table<T>({
  columns,
  data,
  emptyMessage = "No existen registros",
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-outline-variant/30 glass-panel">
      <table className="min-w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-high border-b border-outline-variant/30">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-5 py-4 text-sm font-label font-semibold text-on-surface-variant uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/20">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-8 text-on-surface-variant font-body"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-surface-container-highest transition-colors group"
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="px-5 py-4 text-sm font-body text-on-surface group-hover:text-primary transition-colors"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
