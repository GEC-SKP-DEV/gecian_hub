"use client";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ExpenseCard from "@/components/expense/ExpenseCard";
import ExpenseForm from "@/components/expense/expenseForm";
import DateSelector from "@/components/expense/DateSelector";
import {
  getAllExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "@/lib/expense/idb";
import Link from "next/link";

export default function ExpenseDetailsPage() {
  // Force type to string
  const today: string = new Date().toISOString().split("T")[0]!;

  const [editId, setEditId] = useState<number | null>(null);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [formData, setFormData] = useState<{
    title: string;
    amount: string;
    category: string;
    description: string;
    date: string;
  }>({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: today,
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getAllExpenses();
      setExpenses(data);
    })();
  }, [showForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "date" ? (value || today) : value,
    }));
  };

  const handleEdit = (expense: any) => {
    setFormData({
      ...expense,
      amount: String(expense.amount),
      date: expense.date || today,
    });
    setEditId(expense.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    await deleteExpense(id);
    setExpenses(await getAllExpenses());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: (formData.date || today) as string,
    };
    if (editId !== null) {
      await updateExpense(editId, data);
    } else {
      await addExpense(data);
    }
    setShowForm(false);
    setFormData({
      title: "",
      amount: "",
      category: "",
      description: "",
      date: today,
    });
    setEditId(null);
  };

  const filteredExpenses = expenses.filter((e) => e.date === selectedDate);
  const totalAmount = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="flex justify-between items-center mb-4 text-center">
        <h1 className="text-2xl text-center font-bold text-black w-full">
          Expense Tracker
        </h1>
      </div>

      {!showForm && (
        <>
          <DateSelector
            selectedDate={selectedDate ?? today}
            onDateChange={setSelectedDate}
          />

          <div className="flex justify-between mt-4 text-black">
            <h2 className="text-lg font-semibold">Expenses</h2>
            <span className="font-semibold underline mb-1">
              Total: ₹{totalAmount}
            </span>
          </div>

          <div className="flex flex-col gap-3 mt-3">
            {filteredExpenses.length === 0 ? (
              <p className="text-gray-500 text-center">
                No expenses for selected date.
              </p>
            ) : (
              filteredExpenses.map((e, i) => (
                <ExpenseCard
                  key={i}
                  {...e}
                  onEdit={() => handleEdit(e)}
                  onDelete={() => handleDelete(e.id)}
                />
              ))
            )}
          </div>
        </>
      )}

      {showForm && (
        <ExpenseForm
          onClose={() => setShowForm(false)}
          onChange={handleChange}
          onSubmit={handleSubmit}
          formData={{
            ...formData,
            date: formData.date ?? today,
          }}
        />
      )}

      {!showForm && (
        <>
          <button
            onClick={() => setShowForm(true)}
            className="fixed bottom-20 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all"
          >
            <Plus />
          </button>

          <Link
            href="/expanse/montly"
            className="fixed bottom-24 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-4 py-2 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            📊 Monthly View
          </Link>
        </>
      )}
    </div>
  );
}
