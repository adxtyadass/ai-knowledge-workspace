interface ColumnProps{
    name: string;
    key: string;
}

export default function Table({ columns }: { columns: ColumnProps[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-100">
        <thead className="bg-slate-50/80">
          <tr>
            {columns.map((item) => (
              <th
                key={item.key}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted"
              >
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 bg-white">
          {/* children rows go here */}
        </tbody>
      </table>
    </div>
  );
}
