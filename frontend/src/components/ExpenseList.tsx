export default function ExpenseList({ expenses }: any) {
  return (
    <div className="mt-4">
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses yet</p>
      ) : (
        expenses.map((e: any, i: number) => (
          <div key={i} className="bg-gray-100 p-3 mb-2 rounded shadow">
            <p className="font-semibold">{e.title}</p>
            <p>₹{e.amount}</p>
          </div>
        ))
      )}
    </div>
  );
}