"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  format,
  isThisWeek,
  isThisMonth,
  subMonths,
  isWithinInterval,
  isThisYear,
} from "date-fns";
import axios from "axios";
import { useAuthDataStore } from "@/store/AuthDataStore";
import { useExpenseHistoryStore } from "@/store/ExpenseHistoryStore";
import { useTransactionTypeStore } from "@/store/TransactionTypeStore";

const ExpenseCard = () => {
  const expenseHistoryStore = useExpenseHistoryStore();
  const transactionType = useTransactionTypeStore((state) => state.type);
  const token = useAuthDataStore((state) => state.token);

  const getExpenseHistory = async () => {
    try {
      const resp = await axios.get(
        "https://kelompok1.serverku.org/v1/cashflow/expense",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      expenseHistoryStore.setExpenseHistory(resp.data.expense_details);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const filters = ["Minggu Ini", "Bulan Ini", "3 Bulan"];

  const [selectedFilter, setSelectedFilter] = useState("Minggu Ini");

  const transactions =
    transactionType === "needs"
      ? expenseHistoryStore.needs
      : transactionType === "bills"
      ? expenseHistoryStore.bills
      : transactionType === "shopping"
      ? expenseHistoryStore.shopping
      : transactionType === "transport"
      ? expenseHistoryStore.transport
      : expenseHistoryStore.transfer_of_wealth;

  const filteredTransactions = transactions.filter((tx) => {
    const now = new Date();
    switch (selectedFilter) {
      case "Minggu Ini":
        return isThisWeek(tx.created_at, { weekStartsOn: 1 });
      case "Bulan Ini":
        return isThisMonth(tx.created_at);
      case "3 Bulan":
        return isWithinInterval(tx.created_at, {
          start: subMonths(now, 3),
          end: now,
        });
      case "Tahun Ini":
        return isThisYear(tx.created_at);
      default:
        return true;
    }
  });

  useEffect(() => {
    getExpenseHistory();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center mb-6">
  <div className="flex rounded-md overflow-hidden border border-gray-300 bg-white">
    {filters.map((filter, index) => (
      <Button
        key={filter}
        className={`px-4 py-2 text-sm font-medium ${
          selectedFilter === filter
            ? "bg-yellow-400 text-black"
            : "bg-white text-black"
        } ${index !== filters.length ? "hover:bg-yellow-500 w-30" : ""}`}
        onClick={() => setSelectedFilter(filter)}
        variant="ghost"
      >
        {filter}
      </Button>
    ))}
  </div>
</div>

      <div className="space-y-4">
        {filteredTransactions.map((tx) => (
          <Card
            key={tx.transaction_id}
            className="flex items-center justify-between p-4"
          >
            <CardContent className="p-1 flex flex-col sm:flex-row justify-between w-full items-center">
              <div>
                <p className="font-medium text-[#EF4444]">
                  {
                    transactionType === "needs" ? "Kebutuhan"
                    : transactionType === "bills" ? "Pembayaran"
                    : transactionType === "shopping" ? "Belanja"
                    : transactionType === "transport" ? "Transportasi"
                    : "Kesehatan"
                  }
                </p>
              </div>
              <div>
                <p className="text-sm text-left">
                  {format(tx.created_at, "dd MMMM yyyy")}
                  <br />
                  Transfer Ke{" "}
                  <span className="font-bold">
                    {tx.recipient_account_number}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm">{tx.notes}</p>
              </div>
              <div>
                <p className="text-lg font-bold text-[#000000]">
                  Rp {tx.amount.toLocaleString("id-ID")},00
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExpenseCard;
