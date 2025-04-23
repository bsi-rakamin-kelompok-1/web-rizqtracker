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
import { dataStore } from "@/store/DataStore";

const Login = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const data = dataStore(state => state.data);
  console.log("INI DATA: ", data);

  return (
    <div className="min-h-screen w-full bg-green bg-[url(@/assets/LoginWallpaper.png)] bg-cover bg-center bg-no-repeat flex items-center justify-center">
      <div className="mx-auto container flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col">
          <div className="flex justify-center mb-10">
            <Image src={Logo} alt="Logo" className="w-2xs" />
          </div>
          <div className="flex items-center space-x-2 justify-center">
            <Heading
              className="flex justify-center space-y-3 text-white"
              title="Masuk ke "
              description=""
            />
            <Heading
              className="flex justify-center space-y-3 text-gold"
              title="Dompet Syariah"
              description=""
            />
          </div>
          <Card className="p-10">
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                    <PasswordInput
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="green">Masuk</Button>
            </CardFooter>
            <p className="flex justify-center text-sm text-muted-foreground">
              Belum punya akun? Registrasi
              <Link
                href="/auth/register"
                className="hover: font-bold text-brand text-sm ml-1"
              >
                disini
              </Link>
            </p>
          </Card>
          <div></div>
        </div>
        {/* <LoginForm /> */}
      </div>
    </div>
  );
};

export default Login;
