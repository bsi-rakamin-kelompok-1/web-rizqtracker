"use client";

import Link from "next/link";
import { Heading } from "../ui/Heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import Image from "next/image";
import Logo from "@/assets/Logo.png";
import { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import { useAuthDataStore } from "@/store/AuthDataStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Pin = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const token = useAuthDataStore((state) => state.token);

  const router = useRouter();
  const authStore = useAuthDataStore();

  const [formData, setFormData] = useState({
    pin: "",
    confirm_pin: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://kelompok1.serverku.org/v1/users/set-pin",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Pin berhasil didaftarkan.");

      router.push("/login");
    } catch (err: any) {
      const errorData = err.response?.data;

      console.error("Pin error:", errorData || err.message);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-around h-14 bg-linear-to-r from-linear-black from-0% to-green to-100% px-20">
        <Image src={Logo} alt="Logo" className="w-100" />
        <Card className="w-[450px] p-15">
          <CardHeader>
            <CardTitle className="flex justify-center">Buat Pin Anda</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="pin">Pin</Label>
                  <Input
                    id="pin" // Perhatikan perubahan id menjadi "pin" (lowercase)
                    placeholder=""
                    onChange={handleChange}
                    value={formData.pin}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirm_pin">Confrim Pin</Label>{" "}
                  {/* Perhatikan perubahan htmlFor */}
                  <Input
                    id="confirm_pin" // Perhatikan penambahan id "confirm_pin"
                    value={formData.confirm_pin}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-center">
                  <Button type="submit" variant="green">
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Pin;
