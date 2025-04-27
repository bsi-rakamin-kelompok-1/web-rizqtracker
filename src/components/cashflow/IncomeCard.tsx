"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { format, isThisWeek, isThisMonth, subMonths, isWithinInterval, isThisYear } from "date-fns"

const dummyTransactions = [
    {
      id: 1,
      type: "Transfer",
      from: "Joe Shakira",
      category: "Split Bill",
      amount: 25000,
      date: new Date("2025-04-10T15:01:40"),
    },
    {
      id: 2,
      type: "Transfer",
      from: "Joe Shakira",
      category: "Split Bill",
      amount: 25000,
      date: new Date("2025-04-20T14:32:20"),
    },
    {
      id: 3,
      type: "Transfer",
      from: "Joe Shakira",
      category: "Split Bill",
      amount: 25000,
      date: new Date("2025-04-20T09:05:10"),
    },
    {
      id: 4,
      type: "Transfer",
      from: "Joe Shakira",
      category: "Split Bill",
      amount: 25000,
      date: new Date("2025-03-20T11:10:05"),
    },
    {
      id: 5,
      type: "Transfer",
      from: "Joe Shakira",
      category: "Split Bill",
      amount: 25000,
      date: new Date("2025-02-15T08:25:30"),
    },
    {
      id: 6,
      type: "Transfer",
      from: "Joe Shakira",
      category: "Split Bill",
      amount: 25000,
      date: new Date("2024-11-10T10:00:00"),
    },
    {
        id: 7,
        type: "Transfer",
        from: "Joe Shakira",
        category: "Split Bill",
        amount: 25000,
        date: new Date("2025-04-22T10:00:00"),
      },
  ]

const filters = ["Minggu Ini", "Bulan Ini", "3 Bulan", "Tahun Ini"]

function IncomeCard() {
  const [selectedFilter, setSelectedFilter] = useState("Minggu Ini")

  const filteredTransactions = dummyTransactions.filter((tx) => {
    const now = new Date()
    switch (selectedFilter) {
      case "Minggu Ini":
        return isThisWeek(tx.date, { weekStartsOn: 1 })
      case "Bulan Ini":
        return isThisMonth(tx.date)
      case "3 Bulan":
        return isWithinInterval(tx.date, {
          start: subMonths(now, 3),
          end: now,
        })
      case "Tahun Ini":
        return isThisYear(tx.date)
      default:
        return true
    }
  })

  return (
    <div className="p-4">
      <div className="flex justify-center gap-2 mb-6">
        {filters.map((filter) => (
          <Button
            key={filter}
            className={
              selectedFilter === filter ? "bg-yellow-400 text-black" : ""
            }
            variant={selectedFilter === filter ? "default" : "outline"}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredTransactions.map((tx) => (
          <Card key={tx.id} className="flex items-center justify-between p-4">
            <CardContent className="p-0 flex flex-col sm:flex-row justify-between w-full">
              <div className="space-y-1">
                <p className="font-medium text-primary">{tx.type}</p>
                <p className="text-sm text-muted-foreground">
                  {format(tx.date, "dd MMMM yyyy - HH:mm:ss")}<br />
                  Transfer dari <span className="font-bold">{tx.from}</span>
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <p className="text-sm text-right">{tx.category}</p>
                <p className="text-lg font-bold text-green-700">
                  Rp {tx.amount.toLocaleString("id-ID")},00
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default IncomeCard;
