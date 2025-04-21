import Link from "next/link";
import { Button } from "../ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import Logo from "@/assets/Logo.png";
import HandImg from "@/assets/Hand.png";
import Image from "next/image";

const Register = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-around h-14 bg-linear-to-r from-linear-black from-0% to-green to-100% px-20">
      <Image src={Logo} alt="Logo" className="w-100" />
      <Card className="w-[450px] p-15">
        <CardHeader>
          <CardTitle className="flex justify-center">
            Daftar Akun Baru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input id="name" placeholder="Nama Lengkap" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="telp" placeholder="Nomor Telepon" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="email" placeholder="Email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="pass1" placeholder="Password" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="pass2" placeholder="Confirm Password" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="green">Register</Button>
        </CardFooter>
        <p className="flex justify-center text-sm text-muted-foreground">
          Sudah punya akun? Masuk
          <Link
            href="/auth/login"
            className="hover: font-bold text-brand text-sm ml-1"
          >
            disini
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;
