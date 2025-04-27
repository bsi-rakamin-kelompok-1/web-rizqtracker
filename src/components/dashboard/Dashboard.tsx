"use client";

import { useEffect, useState } from "react";
import {
  ChevronRight,
  Search,
  ChevronDown,
  User,
  LogOut,
  ChevronUp,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { useAuthDataStore } from "@/store/AuthDataStore";
import { useUserStore } from "@/store/UserStore";
import { useCashflowSummaryStore } from "@/store/CashflowSummaryStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/Pagination";
import axios from "axios";
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const token = useAuthDataStore((state) => state.token);
  const router = useRouter();
  const userStore = useUserStore();
  const cashflowSummaryStore = useCashflowSummaryStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [activeTrxTab, setActiveTrxTab] = useState("income");

  const [periodState, setPeriodState] = useState("week");

  const transactions = [
    {
      id: 1,
      date: "19-01-2024",
      type: "Transfer",
      kategori: "Bank Transfer",
      dari: "Aldin",
      untuk: "Rihlan",
      catatan: "Tagihan 1401",
      nominal: "Rp.500.000,00",
    },
  ];

  const getUserDetail = async () => {
    try {
      const resp = await axios.get(
        "https://kelompok1.serverku.org/v1/users/detail",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      userStore.setUser(resp.data.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const getCashflowSummary = async () => {
    try {
      const resp = await axios.get(
        "https://kelompok1.serverku.org/v1/cashflow",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            period: periodState,
          },
        }
      );

      cashflowSummaryStore.setCashflow({
        income: resp.data.summary.income,
        expense: resp.data.summary.expense,
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const filteredTransactions = transactions.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);


  const handleTransferClick = () => {
    router.push('/transactions/transfer');
  };
  const handleTopupClick = () => {
    router.push('/transactions/topup');
  };

  useEffect(() => {
    getUserDetail();
    getCashflowSummary();
  }, []);

  useEffect(() => {
    getCashflowSummary();
  }, [periodState]);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <Card className="mt-4 bg-[#32BAA3] border-0 text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-4xl font-semibold">
                Assalamualaikum, {userStore.full_name}!
              </h2>
              <p className="text-md">7 Jan 2025 • 09:41</p>
            </div>
            <div className="flex items-center">
              <div className="text-right mr-2">
                <h3 className="text-3xl font-semibold">
                  {userStore.full_name}
                </h3>
                <p className="text-md">Akun Personal</p>
              </div>
              <Avatar className="h-15 w-15 border-2 border-white rounded-full overflow-hidden">
                <AvatarImage src="/path/to/cat-image.jpg" alt="Profile" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="flex gap-20">
            <div className="flex-2 bg-white rounded-xl p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl text-black">
                    Berikut adalah jumlah saldo Anda:
                  </p>
                  <h1 className="text-2xl font-bold text-black">
                    Rp {userStore.account.balance.toLocaleString("id-ID")},00
                  </h1>
                </div>
                <div className="flex gap-5">
                  <Button
                    variant="outline"
                    className="bg-white text-xl text-black hover:bg-gray-100 shadow-sm px-4 py-2 w-35 h-15"
                    onClick={handleTransferClick}
                  >
                    Transfer <ChevronRight size={16} className="ml-1" />
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white text-xl text-black hover:bg-gray-100 shadow-sm px-4 py-2 w-35 h-15"
                    onClick={handleTopupClick}
                  >
                    Top Up <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex-1 w-60 bg-white rounded-xl p-7">
              <p className="text-xl text-black">Nomor Rekening:</p>
              <p className="text-2xl font-semibold text-black">
                {userStore.account.account_number}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="flex flex-col gap-4">
          <Card className="h-full border-0 bg-[#32BAA3] text-white p-10">
            <CardContent className="p-4">
              <div className="bg-white rounded-md p-1 flex justify-between items-center">
                <Button
                  className={`${
                    periodState === "week"
                      ? "bg-[#FFC107] text-white"
                      : "bg-transparent text-black"
                  } hover:bg-yellow-500 hover:text-white w-30`}
                  onClick={() => setPeriodState("week")}
                >
                  Minggu Ini
                </Button>
                <Button
                  className={`${
                    periodState === "month"
                      ? "bg-[#FFC107] text-white"
                      : "bg-transparent text-black"
                  } hover:bg-yellow-500 hover:text-white w-30`}
                  onClick={() => setPeriodState("month")}
                >
                  Bulan Ini
                </Button>
                <Button
                  className={`${
                    periodState === "3month"
                      ? "bg-[#FFC107] text-white"
                      : "bg-transparent text-black"
                  } hover:bg-yellow-500 hover:text-white w-30`}
                  onClick={() => setPeriodState("3month")}
                >
                  3 Minggu
                </Button>
              </div>

              <div className="flex justify-between my-7">
                <div className="space-y-2">
                  <div className="text-center my-2 pb-2 border-b border-emerald-400">
                    <p className="text-sm opacity-90">Selisih</p>
                    <p className="text-lg font-bold">Rp {cashflowSummaryStore.diff.toLocaleString('id-ID')},00</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 bg-white text-emerald-500 rounded-full p-0.5" />
                    <span className="text-sm">Pemasukan</span>
                    <span className="text-sm font-bold">
                      Rp {cashflowSummaryStore.total_income.toLocaleString("id-ID")},00
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronUp className="w-4 h-4 bg-white text-red-500 rounded-full p-0.5" />
                    <span className="text-sm">Pengeluaran</span>
                    <span className="text-sm font-bold">Rp {cashflowSummaryStore.total_expense.toLocaleString('id-ID')},00</span>
                  </div>
                </div>

                <div className="relative w-35 h-35">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="white"
                      strokeWidth="15"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#FFC107"
                      strokeWidth="15"
                      strokeDasharray="251.2"
                      strokeDashoffset={cashflowSummaryStore.total_income > cashflowSummaryStore.total_expense ? 
                        (251.2 - (251.2 * (cashflowSummaryStore.total_income/(cashflowSummaryStore.total_income + cashflowSummaryStore.total_expense)*100)) / 100).toFixed(0) :
                        (251.2 - (251.2 * (cashflowSummaryStore.total_expense/(cashflowSummaryStore.total_income + cashflowSummaryStore.total_expense)*100)) / 100).toFixed(0)
                      }
                      transform="rotate(-90 50 50)"
                    />
                    <text
                      x="50%"
                      y="45%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="17"
                      fontWeight="bold"
                    >
                      {cashflowSummaryStore.total_income > cashflowSummaryStore.total_expense ? 
                      (cashflowSummaryStore.total_income/(cashflowSummaryStore.total_income + cashflowSummaryStore.total_expense)*100).toFixed(0) :
                      (cashflowSummaryStore.total_expense/(cashflowSummaryStore.total_income + cashflowSummaryStore.total_expense)*100).toFixed(0)}%
                    </text>
                    <text
                      x="50%"
                      y="60%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {cashflowSummaryStore.total_income > cashflowSummaryStore.total_expense ? 'Pemasukan' : 'Pengeluaran'}
                    </text>
                  </svg>
                </div>
              </div>

              <Card className="border rounded-lg overflow-hidden p-2">
                <div className="grid grid-cols-2">
                  <Button
                    className={`${
                      activeTrxTab === "income"
                        ? "bg-[#5BC8B5] text-white"
                        : "bg-transparent text-black"
                    } hover:bg-[#52b4a3] hover:text-white w-44`}
                    onClick={() => setActiveTrxTab("income")}
                  >
                    Pemasukan
                  </Button>

                  <Button
                    className={`${
                      activeTrxTab === "expense"
                        ? "bg-[#5BC8B5] text-white"
                        : "bg-transparent text-black"
                    } hover:bg-[#52b4a3] hover:text-white w-44`}
                    onClick={() => setActiveTrxTab("expense")}
                  >
                    Pengeluaran
                  </Button>

                  <CardContent className="p-0">
                    <div className="p-3 pl-4">
                      {activeTrxTab === "income" ? (
                        <>
                          <div className="py-1 font-semibold text-gray-900">
                            Top Up
                          </div>
                          <div className="py-1 font-semibold text-gray-900">
                            Transfer
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="py-1 font-semibold text-gray-900">
                            Kebutuhan
                          </div>
                          <div className="py-1 font-semibold text-gray-900">
                            Pembayaran
                          </div>
                          <div className="py-1 font-semibold text-gray-900">
                            Belanja
                          </div>
                          <div className="py-1 font-semibold text-gray-900">
                            Transportasi
                          </div>
                          <div className="py-1 font-semibold text-gray-900">
                            Transfer Kekayaan
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>

                  <CardContent className="p-0">
                    <div className="p-3 pr-4 text-right">
                      {activeTrxTab ==="income" ? (
                        <>
                          <div className="py-1 text-gray-900">
                            Rp {cashflowSummaryStore.income.total_topup.toLocaleString("id-ID")},00
                          </div>
                          <div className="py-1 text-gray-900">
                            Rp {cashflowSummaryStore.income.total_transfer.toLocaleString("id-ID" )},00
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="py-1 text-gray-900">
                            Rp {cashflowSummaryStore.expense.total_needs.toLocaleString("id-ID")},00
                          </div>
                          <div className="py-1 text-gray-900">
                            Rp {cashflowSummaryStore.expense.total_bills.toLocaleString("id-ID")},00
                          </div>
                          <div className="py-1 text-gray-900">
                            Rp {cashflowSummaryStore.expense.total_shopping.toLocaleString("id-ID")},00
                          </div>
                          <div className="py-1 text-gray-900">
                            Rp {cashflowSummaryStore.expense.total_transport.toLocaleString("id-ID")},00
                          </div>
                          <div className="py-1 text-gray-900">
                            Rp {cashflowSummaryStore.expense.total_transfer_of_wealth.toLocaleString("id-ID")},00
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Card>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-2">
          <Card className="h-full">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Cari transaksi/nomor..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          Rentangan Waktu
                          <ChevronDown size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Hari Ini</DropdownMenuItem>
                        <DropdownMenuItem>Kemarin</DropdownMenuItem>
                        <DropdownMenuItem>Minggu Ini</DropdownMenuItem>
                        <DropdownMenuItem>Bulan Ini</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          Tanggal
                          <ChevronDown size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Terbaru</DropdownMenuItem>
                        <DropdownMenuItem>Terlama</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          Nominal
                          <ChevronDown size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Tertinggi</DropdownMenuItem>
                        <DropdownMenuItem>Terendah</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table className="outline">
                    <TableHeader className="bg-yellow-100">
                      <TableRow>
                        <TableHead className="font-medium text-gray-600">
                          Tanggal dan Waktu
                        </TableHead>
                        <TableHead className="font-medium text-gray-600">
                          Type
                        </TableHead>
                        <TableHead className="font-medium text-gray-600">
                          Kategori
                        </TableHead>
                        <TableHead className="font-medium text-gray-600">
                          Dari
                        </TableHead>
                        <TableHead className="font-medium text-gray-600">
                          Untuk
                        </TableHead>
                        <TableHead className="font-medium text-gray-600">
                          Catatan
                        </TableHead>
                        <TableHead className="font-medium text-gray-600">
                          Nominal
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentTransactions.length > 0 ? (
                        currentTransactions.map((item) => (
                          <TableRow key={item.id} className="hover:bg-gray-50">
                            <TableCell className="text-xs">
                              {item.date}
                            </TableCell>
                            <TableCell className="text-xs">
                              {item.type}
                            </TableCell>
                            <TableCell className="text-xs">
                              {item.kategori}
                            </TableCell>
                            <TableCell className="text-xs">
                              {item.dari}
                            </TableCell>
                            <TableCell className="text-xs">
                              {item.untuk}
                            </TableCell>
                            <TableCell className="text-xs">
                              {item.catatan}
                            </TableCell>
                            <TableCell className="text-xs font-medium text-red-500">
                              {item.nominal}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            className="text-center py-6 text-gray-500"
                          >
                            Tidak ada transaksi ditemukan
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: Math.min(totalPages, 3) }).map(
                      (_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(index + 1);
                            }}
                            isActive={currentPage === index + 1}
                            className={
                              currentPage === index + 1
                                ? "bg-yellow-500 text-white"
                                : ""
                            }
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    {totalPages > 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages)
                            setCurrentPage(currentPage + 1);
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
