import { ArrowLeft, Bold, Italic, Text, Underline } from "lucide-react";
import { Heading } from "../ui/Heading";
import { ToggleGroup, ToggleGroupItem } from "../ui/ToggleGroup";

const IncomeHist = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#32BAA3] to-[#FFFFFF] flex items-center justify-center">
      <div className="flex flex-col">
        <div className="flex justify-start my-5">
          <ArrowLeft color="white" strokeWidth={3} className="my-2 ml-10"></ArrowLeft>
          <Heading
            className="flex justify-center text-white ml-40"
            title="Detail Pemasukan"
            description=""
          />
        </div>
        <div className="flex justify-center">
          <ToggleGroup type="single" defaultValue="minggu-ini" className="bg-white p-1.5">
            <ToggleGroupItem value="minggu-ini" className="data-[state=on]:bg-[#FFC107] data-[state=on]:text-black px-20 py-1 text-sm">
              Minggu Ini
            </ToggleGroupItem>
            <ToggleGroupItem value="bulan-ini" className="data-[state=on]:bg-[#FFC107] data-[state=on]:text-black px-20 py-1 text-sm">
              Bulan Ini
            </ToggleGroupItem>
            <ToggleGroupItem value="3-minggu" className="data-[state=on]:bg-[#FFC107] data-[state=on]:text-black px-20 py-1 text-sm">
              3 Minggu
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
};

export default IncomeHist;
