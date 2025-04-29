"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { dataStore } from "@/app/store/DataStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthDataStore } from "@/store/AuthDataStore";
import { useUserStore } from "@/store/UserStore";
import axios from "axios";

const dummyUsers = {
  id: "fa8f23af-b469-4062-87e3-08cefa90cf11",
  transaction_type: "transfer",
  sender_account_number: 700000000,
  recipient_account_number: 700000001,
  transfer_category: "shopping",
  amount: 1000,
  notes: "ini notes coba",
  reference_number: "TRX-TF-20250422930665",
  created_at: "2025-04-22T20:23:37.212916",
};

const Transfer = () => {
  const router = useRouter();
  const setData = dataStore((state) => state.setData);
  setData(dummyUsers);
  const token = useAuthDataStore((state) => state.token);
  const userStore = useUserStore();
  const [accountNumber, setAccountNumber] = useState("");
  const [accountExists, setAccountExists] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    recipient_account_number: "",
    transfer_category: "",
    amount: "",
    pin: "",
    notes: "",
  });

  const handleInputChange = (event) => {
    setAccountNumber(event.target.value);
  };

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

  const checkAccount = async () => {
    setError("");
    setAccountExists(null); 
    try {
      const resp = await axios.get(
        `https://kelompok1.serverku.org/v1/accounts/${accountNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //   userStore.setUser(resp.data.data);
      if (resp.status >= 200 && resp.status < 300) {
        setAccountExists(true);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  useEffect(() => {
    getUserDetail();
    checkAccount();
  }, []);

  return (
    <>
      <Navbar />
      <div className=" bg-gradient-to-b min-h-screen from-[#32BAA3] to-[#FFFFFF]">
        <div className="flex justify-center p-5">
          <Card className="w-full max-w-md">
            <CardContent className="p-5 space-y-3">
              <ArrowLeft className="cursor-pointer" />
              <div className="flex items-center justify-center space-x-2">
                <h2 className="text-xl font-bold">Transfer</h2>
              </div>

              <div className="space-y-1">
                <Label>Penerima</Label>
                <div className="flex gap-7 ">
                  <Input
                    placeholder="Masukkan rekening penerima"
                    type="text"
                    id="accountNumber"
                    value={accountNumber}
                    onChange={handleInputChange}
                  />
                  <Button
                    variant="outline"
                    className="cursor-pointer text-xs text-white w-fit bg-[#FFC107]"
                    onClick={checkAccount}
                  >
                    Cek
                  </Button>
                </div>
                {accountExists === true && (
                  <p className="text-green-500">Akun ditemukan.</p>
                )}
                {accountExists === false && (
                  <p className="text-red-500">Akun tidak ditemukan.</p>
                )}
                {error && <p className="text-orange-500">{error}</p>}
              </div>

              <div className="space-y-1">
                <Label>Nominal</Label>
                <div className="flex flex-col">
                  <Input
                    type="text"
                    placeholder="Isi Nominal"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Saldo: {userStore.account.balance}
                  </p>
                </div>
                <div className="">
                  <Select>
                    <SelectTrigger className="mt-2 w-full">
                      <SelectValue placeholder="Pilih kategori transfer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kebutuhan">Kebutuhan</SelectItem>
                      <SelectItem value="Pembayaran">Pembayaran</SelectItem>
                      <SelectItem value="Belanja">Belanja</SelectItem>
                      <SelectItem value="Transportasi">Transportasi</SelectItem>
                      <SelectItem value="Transfer Kekayaan">
                        Transfer Kekayaan
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1">
                <Label>Catatan</Label>
                <Input placeholder="Catatan.." />
              </div>
              <div className="flex justify-center">
                <Button className="w-2xs mt-4 bg-[#32BAA3]">
                  <Link
                    href="/transactions/receipt"
                    className="hover: font-bold text-brand text-sm ml-1"
                  >
                    Transfer
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
export default Transfer;
