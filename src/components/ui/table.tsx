interface ColumnProps{
    name: string;
    key: string;
}

export default function Table({ columns }: { columns: ColumnProps[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
        <thead className="bg-gray-50">
          {columns.map((item) => <tr key={item.key}>{item.name}</tr>)}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  );
}