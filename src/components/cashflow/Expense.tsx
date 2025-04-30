"use client"

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
  import ExpenseCard from "@/components/cashflow/ExpenseCard";
import { useRouter } from "next/navigation";
  
const Expense = () =>{
    const router = useRouter();
    
    const handleBackToDashboard= () => {
      router.push("/dashboard");
    };
  
    return (
      <>
        <Navbar />
        <div className=" bg-gradient-to-b min-h-screen from-[#32BAA3] to-[#FFFFFF]">
            <div className="flex justify-center p-5">
                <div className="w-full max-w-4xl">
                    <ArrowLeft className="cursor-pointer text-white"  onClick={handleBackToDashboard} />
                    <div className="flex flex-row justify-center">
                        <h2 className="text-xl text-white font-bold">Detail Pengeluaran</h2>
                    </div>
                
                <ExpenseCard/>       
                </div>
            </div>
        </div>
      </>
    );
  }

export default Expense;
  