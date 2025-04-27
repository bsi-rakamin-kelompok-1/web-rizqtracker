"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { CircleCheck } from 'lucide-react';
import Navbar from "@/components/Navbar";
import TableReceipt from "@/components/TableReceipt";
import { dataStore } from "@/app/store/DataStore";



const dummyUsers = 
  { id: "1", amount: 100000000, name: "budi@example.com", typeTransaction: "Transfer", categoryTransfer: "Transfer Kekayaan", referenceNumber: "TRRX-TTFFFFFFFFFFDF39192302", note: "NICE" }




export default function receipt() {

  const data = dataStore(state => state.data);
  console.log("INI DATA: ", data);
  return (
    <>
      <Navbar/>
      
      <div className=" bg-gradient-to-b min-h-screen from-[#32BAA3] to-[#FFFFFF]">
        <h1>receipt</h1>
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
            <a className="text-l text-[#32BAA3] ">20 April 2025 - 15:01:40</a>
          </div>        
          <TableReceipt data={dummyUsers}/>
          <div className="flex justify-center">
          <Button className="w-2xs mt-4 bg-[#32BAA3] " >
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
