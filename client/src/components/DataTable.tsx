import type { ReactNode } from "react";

export type Column = {
  key: string;
  label: string;
};

type DataTableProps = {
  columns: Column[];
  rows: Record<string, ReactNode>[];
};

export function DataTable({
  columns,
  rows,
}: DataTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-slate-50">
            {columns.map((col) => (
              <th
                key={col.key}
                className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className="border-b last:border-none"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="
                    px-6
                    py-4
                    text-sm
                    text-slate-700
                  "
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}