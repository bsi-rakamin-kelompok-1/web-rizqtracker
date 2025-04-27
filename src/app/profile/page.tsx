"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";

export default function Profile() {
  const [profileData, setProfileData] = useState({
    nama: "John Doe",
    email: "john.doe@gmail.com",
    phone: "08123456789",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop",
    jobTitle: "Senior Developer",
    company: "Tech Innovations Inc.",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b min-h-screen from-[#32BAA3] to-[#FFFFFF] p-6">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Halaman Profil</h1>

          <Card>
            <CardContent className="p-6 space-y-7">
            <ArrowLeft className="cursor-pointer" />
          <div className="flex items-center justify-center space-x-2">
            
            <h2 className="text-xl font-bold">Halaman Profil</h2>
          </div>
{/* 
              <hr className="border-t border-gray-200" /> */}


              <div className="space-y-4">
                <div>
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input
                    id="nama"
                    value={profileData.nama}
                    onChange={handleChange}
                    placeholder="Nama Lengkap"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={profileData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    type="email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Nomor HP</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    placeholder="Nomor HP"
                    type="tel"
                  />
                </div>
                <div>
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input
                    id="avatar"
                    value={profileData.avatar}
                    onChange={handleChange}
                    placeholder="URL Avatar"
                    type="url"
                  />
                </div>
              </div>

              <Button className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white">
                Perbaharui Profil
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
