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
import toast from "react-hot-toast";
import { useTransferNoPinStore } from "@/store/TransferNoPinStore";


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
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const transfernopinStore = useTransferNoPinStore();


  const [formData, setFormData] = useState({
    recipient_account_number: "",
    transfer_category: "",
    amount: "",
    pin: "",
    notes: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'accountNumber') {
      setAccountNumber(value); // Hanya perbarui accountNumber state
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [id]: value
      }));
    }
  };

  const handleTransferCategoryChange = (value: string) => {
    setFormData(prevData => ({
      ...prevData,
      transfer_category: value,
    }));
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
    setFormData(prevFormData => ({
        ...prevFormData,
        recipient_account_number: accountNumber, // Salin accountNumber ke formData
      }));
    
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      setIsLoading(true);
     

      //toast.success("Transfer Berhasil.");
      transfernopinStore.setTransferNoPin(formData);
      router.push("/auth/confirm-pin-transfer");
    } catch (err: any) {
      setIsLoading(false);

      const errorData = err.response?.data;

      if(errorData?.errors && Array.isArray(errorData?.errors)) {
        const fieldErrors: Partial<typeof formData> = {};

      }
      else if (errorData?.message) {
        toast.error(errorData.message);
      } 
      else {
        toast.error("Something went wrong!");
      }

      console.error("Topup error:", errorData || err.message);
    }
    finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUserDetail();
    checkAccount();
  }, []);

  useEffect(() => {
    console.log("FORM DATA: ", formData)
  }, [handleChange]);

  return (
    <>
      <Navbar />
      <div className=" bg-gradient-to-b min-h-screen from-[#32BAA3] to-[#FFFFFF]">
        <div className="flex justify-center p-5">
          <Card className="w-full max-w-md">
            <CardContent className="p-5 space-y-3">
              <ArrowLeft className="cursor-pointer" onClick={handleBack} />
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
              <form onSubmit={handleSubmit}> 
              <div className="space-y-1">
                <Label>Nominal</Label>
                <div className="flex flex-col">
                  <Input
                  id="amount" 
                    placeholder="Isi Nominal"
                    className="w-full"
                    onChange={handleChange} 
                    value={formData.amount} 
                  />
                  
                  <p className="text-xs text-gray-500 mt-1">
                    Saldo: {userStore.account.balance}
                  </p>
                </div>
                <div className="">
                  <Select onValueChange={handleTransferCategoryChange} value={formData.transfer_category}>
                    <SelectTrigger className="mt-2 w-full">
                      <SelectValue placeholder="Pilih kategori transfer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="needs">Kebutuhan</SelectItem>
                      <SelectItem value="bills">Pembayaran</SelectItem>
                      <SelectItem value="shopping">Belanja</SelectItem>
                      <SelectItem value="transport">Transportasi</SelectItem>
                      <SelectItem value="transfer_of_wealth">
                        Transfer Kekayaan
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1">
                <Label>Catatan</Label>
                <Input id= "notes" 
                placeholder="Catatan.."
                 onChange={handleChange} 
                value={formData.notes} 
                 />
              </div>
              <div className="flex justify-center">
                <Button type="submit" className="w-2xs mt-4 bg-[#32BAA3]">
                  {/* <Link
                    href="/transactions/receipt"
                    className="hover: font-bold text-brand text-sm ml-1"
                  >
                    Transfer
                  </Link> */}
                </Button>
              </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
export default Transfer;
