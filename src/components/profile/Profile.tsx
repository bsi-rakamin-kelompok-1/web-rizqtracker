"use client";

import { useState,useEffect } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";
import { useUserStore } from "@/store/UserStore";
import { useAuthDataStore } from "@/store/AuthDataStore";
import axios from "axios";

const Profile = () =>{
  const [profileData, setProfileData] = useState({
	"full_name": "John Doe abc",
	"phone_number": "628112233441"
  });
  const userStore = useUserStore();
    const token = useAuthDataStore((state) => state.token);
  const getUserDetail = async () => {
    try {
      const resp = await axios.get(
        "https://kelompok1.serverku.org/v1/users/detail",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      userStore.setUser(resp.data.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  useEffect(() => {
    getUserDetail();
  }, []);

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
                    value={userStore.full_name}
                    onChange={handleChange}
                    placeholder="Nama Lengkap"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={userStore.email}
                    onChange={handleChange}
                    placeholder="Email"
                    type="email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Nomor HP</Label>
                  <Input
                    id="phone"
                    value={userStore.phone_number}
                    onChange={handleChange}
                    placeholder="Nomor HP"
                    type="tel"
                  />
                </div>
                <div>
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input
                    id="avatar"
                    value={userStore.avatar_url ?? ""} 
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
export default Profile;