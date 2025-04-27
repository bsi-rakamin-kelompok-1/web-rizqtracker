"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { dataStore } from "@/app/store/DataStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

const dummyUsers = 
  {
    id: "fa8f23af-b469-4062-87e3-08cefa90cf11",
    transaction_type: "transfer",
    sender_account_number: 700000000,
    recipient_account_number: 700000001,
    transfer_category: "shopping",
    amount: 1000,
    notes: "ini notes coba",
    reference_number: "TRX-TF-20250422930665",
    created_at: "2025-04-22T20:23:37.212916"
  }




export default function transfer() {
  const router = useRouter();
  const setData = dataStore(state => state.setData);
  setData(dummyUsers);



  return (
    <>
      <Navbar />
      <div className=" bg-gradient-to-b min-h-screen from-[#32BAA3] to-[#FFFFFF]">
        <h1>Transfer</h1>

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
              // value={recipient}
              // onChange={(e) => setRecipient(e.target.value)}
            />
            <Button variant="outline" className="text-xs text-white w-fit bg-[#FFC107]">Cek</Button>
            </div>
          </div>

          <div className="space-y-1">
            <Label>Nominal</Label>
            <Input
              type="text"
              placeholder="Isi Nominal"
              className=""
              // value={amount}
              // onChange={(e) => setAmount(e.target.value)}
            />
            <div className="">

            <Select  >
              <SelectTrigger className="mt-2 w-[12rem]">
                <SelectValue placeholder="Pilih kategori transfer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kebutuhan">Kebutuhan</SelectItem>
                <SelectItem value="Pembayaran">Pembayaran</SelectItem>
                <SelectItem value="Belanja">Belanja</SelectItem>
                <SelectItem value="Transportasi">Transportasi</SelectItem>
                <SelectItem value="Transfer Kekayaan">Transfer Kekayaan</SelectItem>
              </SelectContent>
            </Select>
            </div>
          </div>

          <div className="space-y-1">
            <Label>Catatan</Label>
            <Input
              placeholder="Catatan.."
              // value={note}
              // onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
          <Button className="w-2xs mt-4 bg-[#32BAA3]  "  >
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
}
