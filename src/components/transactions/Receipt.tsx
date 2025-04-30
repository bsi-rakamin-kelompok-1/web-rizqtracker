"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { Button } from "@/components/ui/Button";
import { CircleCheck } from 'lucide-react';
import Navbar from "@/components/Navbar";
import TableReceipt from "@/components/TableReceipt";

import { useReceiptTopupStore } from "@/store/ReceiptTopupStore";
import { format } from "date-fns"
import { useRouter } from "next/navigation";





const Receipt = () =>{
    const receiptTopupStore = useReceiptTopupStore();
    const router = useRouter();
    const handleDashboardClick = () => {
        router.push('/dashboard');
      };
  return (
    <>
      <Navbar/>
      
      <div className=" bg-gradient-to-b min-h-screen from-[#32BAA3] to-[#FFFFFF]">
 
        <div className="flex justify-center p-5">
        <Card className="w-full max-w-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex justify-center">
            <div className="bg-[#32BAA3] w-20 h-20 rounded-[4rem] ">
              <CircleCheck className="text-white w-20 h-20"/>
            </div>
          </div>  
          <div className="flex items-center justify-center space-x-2">
            <h2 className="text-xl text-[#32BAA3] font-bold">Alhamdulillah, transaksi kamu berhasil!</h2>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-9">
            <a className="text-l text-[#32BAA3] ">{format(receiptTopupStore.created_at, "dd MMMM yyyy - HH:mm:ss")}</a>
          </div>        
          <TableReceipt />
          <div className="flex justify-center">
          <Button className="w-2xs mt-4 bg-[#32BAA3] "
          onClick={handleDashboardClick} >
            Kembali
          </Button> 
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
    </>
  );
}
export default Receipt;