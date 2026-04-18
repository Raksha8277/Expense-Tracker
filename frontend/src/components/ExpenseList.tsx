export default function ExpenseList({ expenses }: any) {
  return (
    <div className="mt-6">

      
      {expenses.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-lg">No expenses yet 😔</p>
          <p className="text-sm">Start adding your expenses above</p>
        </div>
      ) : (

        <div className="grid gap-4">

          {expenses.map((e: any, i: number) => (
            <div
              key={i}
              className="flex justify-between items-center p-4 bg-white/50 backdrop-blur-lg border border-white/30 rounded-2xl shadow-md hover:scale-[1.02] hover:shadow-xl transition duration-300"
            >

              
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {e.title}
                </p>
                <p className="text-sm text-gray-500">
                  Expense item
                </p>
              </div>

              
              <div className="text-right">
                <p className="text-xl font-bold text-indigo-600">
                  ₹{e.amount}
                </p>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}