"use client"

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
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { PasswordInput } from "./PasswordInput";

const Register = () => {
  const[isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const[formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      setIsLoading(true);
      const res = await axios.post("https://kelompok1.serverku.org/v1/auth/register", formData);

      toast.success("Akun berhasil didaftarkan.");
      
      router.push("/auth/login");
    } catch (err: any) {
      setIsLoading(false);

      const errorData = err.response?.data;

      if(errorData?.errors && Array.isArray(errorData?.errors)) {
        const fieldErrors: Partial<typeof formData> = {};

        for (const error of errorData.errors) {
          const lowerError = error.toLowerCase();

          if(lowerError.includes("full name")) {
            fieldErrors.full_name = error;
          }
          else if (lowerError.includes("phone number")) {
            fieldErrors.phone_number = fieldErrors.phone_number
            ? `${fieldErrors.phone_number}, ${error}`
            : error;
          }
          else if (lowerError.includes("email")) {
            fieldErrors.email = fieldErrors.email
            ? `${fieldErrors.email}, ${error}`
            : error;
          }
          else if (lowerError.includes("symbol") || lowerError.includes("password length") || lowerError.includes("uppercase")) {
            fieldErrors.password = fieldErrors.password
            ? `${fieldErrors.password}, ${error}`
            : error;
          }
          else if (lowerError.includes("password and confirm") || lowerError.includes("confirm password")) {
            fieldErrors.confirm_password = fieldErrors.confirm_password
            ? `${fieldErrors.confirm_password}, ${error}`
            : error;
          } 

          setErrors(fieldErrors);
        }
      }
      else if (errorData?.message) {
        toast.error(errorData.message);
      } 
      else {
        toast.error("Something went wrong!");
      }

      console.error("Registration error:", errorData || err.message);
    }
    finally {
      setIsLoading(false);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input id="full_name" placeholder="Nama Lengkap" onChange={handleChange} value={formData.full_name} />
                {errors.full_name && <p className="text-sm text-red-500">{errors.full_name}</p>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="phone_number" placeholder="Nomor Telepon" onChange={handleChange} value={formData.phone_number} />
                {errors.phone_number && <p className="text-sm text-red-500">{errors.phone_number}</p>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="email" placeholder="Email" onChange={handleChange} value={formData.email} />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
              <div className="flex flex-col space-y-1.5">
                {/* <Input id="password" placeholder="Password" onChange={handleChange} value={formData.password} /> */}
                <PasswordInput
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  placeholder="Password"
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>
              <div className="flex flex-col space-y-1.5">
                {/* <Input id="confirm_password" placeholder="Confirm Password" onChange={handleChange} value={formData.confirm_password} /> */}
                <PasswordInput
                  id="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  placeholder="Confirmation Password"
                />
                {errors.confirm_password && <p className="text-sm text-red-500">{errors.confirm_password}</p>}
              </div>
              <div className="flex justify-center">
                <Button type="submit" variant="green" disabled={isLoading}>Register</Button>
              </div>
            </div>
          </form>
        </CardContent>
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
