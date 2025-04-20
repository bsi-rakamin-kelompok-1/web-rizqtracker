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

export default function transfer() {
  return (
    <>
      <Navbar />
      <div className=" bg-gradient-to-r min-h-screen from-[#32BAA3] to-[#FFC107]">
        <h1>Transfer</h1>

        <div className="flex justify-center p-5">
          <Card className="w-[950px]">
            <CardHeader>
              <div className="flex justify-center items-center space-x-1 py-4">
                <ArrowLeft className="" />
                <div className="flex-1 justify-center">
                  <CardTitle className="text-4xl mx-4 flex-1 text-center">
                    Transfer
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex justify-between space-x-1 space-y-1">
                    <div className="flex flex-col space-y-1.5 min-w-96">
                      <div className="min-w-96">
                        <Label htmlFor="recipient">Penerima</Label>
                        <div className="flex justify-between mt-1.5 w-full">
                          <div className="w-80">
                            <Select>
                              <SelectTrigger id="recipient">
                                <SelectValue
                                  className=""
                                  placeholder="Nomor rekening"
                                />
                              </SelectTrigger>
                              <SelectContent
                                // className="w-[900px]"
                                position="popper"
                              >
                                <SelectItem value="Giz">
                                  70000000 (Giz)
                                </SelectItem>
                                <SelectItem value="Gaz">
                                  70000001 (Gaz)
                                </SelectItem>
                                <SelectItem value="Guz">
                                  70000002 (Guz)
                                </SelectItem>
                                <SelectItem value="Ghost">
                                  70000003 (Ghost)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="bg-[#F4A43C]">
                            Cek Nomor Rekening
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row space-y-1.5">
                    <Label htmlFor="name" className="mr-21">Nominal</Label>
                    <Input
                      id="name"
                      placeholder="Masukan nominal yang diinginkan"
                    />
                  </div>
                  <div className="flex space-x-1 space-y-1">
                    <div className="flex space-y-1.5 min-w-96">
                      <div className="flex flex-row">
                        <Label htmlFor="recipient" className="mr-8">Kategori Transfer</Label>
                        <Select>
                          <SelectTrigger id="recipient">
                            <SelectValue placeholder="Pilih kategori transfer" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="Giz">Kebutuhan</SelectItem>
                            <SelectItem value="Gaz">Pembayaran</SelectItem>
                            <SelectItem value="Guz">Belanja</SelectItem>
                            <SelectItem value="Ghost">Transportasi</SelectItem>
                            <SelectItem value="Ghost">
                              Transfer Kekayaan
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row space-y-1.5 ">
                    <Label htmlFor="name" className="mr-23">Catatan</Label>
                    <Input
                      id="name"
                      className=""
                      placeholder="Catatan...."
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button className="bg-[#32BAA3] px-12">Transfer</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
