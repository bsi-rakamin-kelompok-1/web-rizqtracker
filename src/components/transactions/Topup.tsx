"use client";
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
} from "@/components/ui/select";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { ArrowLeft, Pin } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthDataStore } from "@/store/AuthDataStore";
import { useTopupNoPinStore } from "@/store/TopupNoPinStore";

const Topup = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = useAuthDataStore((state) => state.token);
  const topupnopinStore = useTopupNoPinStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    topup_method: "",
    amount: "",
    notes: "",
    pin: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleTopupMethodChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      topup_method: value,
    }));
  };

  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      setIsLoading(true);

      //   toast.success("Topup Berhasil.");
      topupnopinStore.setTopupNoPin(formData);
      router.push("/auth/confirm-pin");
    } catch (err: any) {
      setIsLoading(false);

      const errorData = err.response?.data;

      if (errorData?.errors && Array.isArray(errorData?.errors)) {
        const fieldErrors: Partial<typeof formData> = {};
      } else if (errorData?.message) {
        toast.error(errorData.message);
      } else {
        toast.error("Something went wrong!");
      }

      console.error("Topup error:", errorData || err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDashboardClick = () => {
    router.push("/dashboard");
  };
  return (
    <>
      <Navbar />
      <div className=" bg-gradient-to-b min-h-screen from-[#32BAA3] to-[#FFFFFF]">
        <div className="flex justify-center p-5">
          <Card className="w-full max-w-md">
            <CardContent className="p-5 space-y-3">
              <ArrowLeft
                className="cursor-pointer"
                onClick={handleDashboardClick}
              />
              <div className="flex items-center justify-center space-x-2">
                <h2 className="text-xl font-bold">Top Up</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-1 my-6">
                  <Label>Nominal</Label>
                  <Input
                    id="amount"
                    placeholder="Isi Nominal"
                    onChange={handleChange}
                    value={formData.amount}
                  />
                  {/* <Input
                  type="text"
                  placeholder="Isi Nominal"
                  className=""
                  // value={amount}
                  // onChange={(e) => setAmount(e.target.value)}
                  /> */}
                </div>
                <div className="space-y-1 my-6">
                  <Label>Sumber Dana</Label>
                  <Select
                    onValueChange={handleTopupMethodChange}
                    value={formData.topup_method}
                  >
                    <SelectTrigger className="mt-2 w-[12rem]">
                      <SelectValue placeholder="Pilih sumber dana" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank_transfer">
                        Bank Transfer
                      </SelectItem>
                      <SelectItem value="debit_card">Kartu Debit</SelectItem>
                      <SelectItem value="credit_card">Kartu Kredit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1 my-6">
                  <Label>Catatan</Label>
                  <Input
                    id="notes"
                    placeholder="Catatan.."
                    onChange={handleChange}
                    value={formData.notes}
                  />
                  {/* <Input
                  placeholder="Catatan.."
                  // value={note}
                  // onChange={(e) => setNote(e.target.value)}
                  /> */}
                </div>
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className=" w-2xs mt-4 bg-[#32BAA3]"
                    disabled={isLoading}
                  >
                    Top Up
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

export default Topup;
