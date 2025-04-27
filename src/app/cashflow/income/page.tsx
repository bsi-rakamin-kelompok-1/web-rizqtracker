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
  import IncomeCard from "@/components/cashflow/IncomeCard";
  
  export default function income() {
    
  
  
    return (
      <>
        <Navbar />
        <div className=" bg-gradient-to-b min-h-screen from-[#32BAA3] to-[#FFFFFF]">
            <div className="flex justify-center p-5">
                <div className="w-full max-w-4xl">
                    <ArrowLeft className="cursor-pointer text-white " />
                    <div className="flex flex-row justify-center">
                        <h2 className="text-xl text-white font-bold">Detail Pemasukan</h2>
                    </div>
                
                <IncomeCard/>       
                </div>
            </div>
        </div>
      </>
    );
  }
  