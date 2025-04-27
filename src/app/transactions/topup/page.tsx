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

export default function topup() {
  


  return (
    <>
      <Navbar />
      <div className=" bg-gradient-to-b min-h-screen from-[#32BAA3] to-[#FFFFFF]">
        <h1>Top up</h1>

        <div className="flex justify-center p-5">
        <Card className="w-full max-w-md">
        <CardContent className="p-5 space-y-3">
        <ArrowLeft className="cursor-pointer" />
          <div className="flex items-center justify-center space-x-2">
            
            <h2 className="text-xl font-bold">Top Up</h2>
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
          </div>
          <div className="space-y-1">
            <Label>Sumber Dana</Label>
            <Select  >
              <SelectTrigger className="mt-2 w-[12rem]">
                <SelectValue placeholder="Pilih sumber dana" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kebutuhan">Bank Transfer</SelectItem>
                <SelectItem value="Pembayaran">Kartu Debit</SelectItem>
                <SelectItem value="Belanja">Kartu Kredit</SelectItem>
              </SelectContent>
            </Select>
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
          <Button className="w-2xs mt-4 bg-[#32BAA3] " >
            Top Up
          </Button>
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
    </>
  );
}
