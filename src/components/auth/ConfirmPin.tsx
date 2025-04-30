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
import { useReceiptTopupStore } from "@/store/ReceiptTopupStore";
import { PasswordInput } from "./PasswordInput";

const ConfirmPin = () => {
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const token = useAuthDataStore((state) => state.token);
  const topupnopinStore = useTopupNoPinStore();
  const router = useRouter();
  const receiptTopup = useReceiptTopupStore();

  const[formData, setFormData] = useState({
    pin: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }));

    if (id === 'pin') {
      topupnopinStore.setTopupNoPin({ pin: value });
    }
  };

  const [errors, setErrors] = useState<Partial<typeof formData>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
    
        try {
          setIsLoading(true);
          const res = await axios.post("https://kelompok1.serverku.org/v1/transactions/topup", topupnopinStore,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
    
          toast.success("Topup Berhasil.");
          receiptTopup.setReceiptTopup(res.data.data);
          router.push("/transactions/receipt");
        } catch (err: any) {
          setIsLoading(false);
    
          const errorData = err.response?.data;
    
          if(errorData?.errors && Array.isArray(errorData?.errors)) {
            const fieldErrors: Partial<typeof topupnopinStore> = {};
    
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
  return (
    <>
      <Navbar />
      <div className=" bg-gradient-to-b min-h-screen from-[#32BAA3] to-[#FFFFFF]">
        <div className="flex justify-center p-5">
          <Card className="w-full max-w-md">
            <CardContent className="p-5 space-y-3">
              <ArrowLeft className="cursor-pointer" />
              <div className="flex items-center justify-center space-x-2">
                <h2 className="text-xl font-bold">Masukan Pin</h2>
              </div>
              <form onSubmit={handleSubmit}>
              <div className="space-y-1 my-6">
                <Label>Pin</Label>
                <PasswordInput id="pin" 
                placeholder="Isi Pin" 
                onChange={handleChange} 
                value={formData.pin} 
                autoComplete="new-password"
                />
                {/* <Input
                  type="text"
                  placeholder="Isi Nominal"
                  className=""
                  // value={amount}
                  // onChange={(e) => setAmount(e.target.value)}
                  /> */}
              </div>
              <div className="flex justify-center">
                <Button type="submit"  className=" w-2xs mt-4 bg-[#32BAA3]" disabled={isLoading}>Top Up</Button>
              </div>
            </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ConfirmPin;
