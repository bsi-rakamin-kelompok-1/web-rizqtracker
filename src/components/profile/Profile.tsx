"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";
import { useUserStore } from "@/store/UserStore";
import { useAuthDataStore } from "@/store/AuthDataStore";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Profile = () => {
  const[isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
  });
  const userStore = useUserStore();
  const token = useAuthDataStore((state) => state.token);

  const getUserDetail = async () => {
    try {
      const resp = await axios.get(
        "https://kelompok/v1/users/detail",
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
    const fetchUserData = async () => {
      await getUserDetail();
      setFormData({
        full_name: userStore.full_name || "",
        phone_number: userStore.phone_number || "",
      });
    };

    fetchUserData();
  }, [userStore.full_name, userStore.phone_number]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      setIsLoading(true);
      const res = await axios.patch("https://kelompok/v1/users/detail", formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      toast.success("Update Profile Berhasil.");
      router.push("/profile");
    } catch (err: any) {
      setIsLoading(false);
      const errorData = err.response?.data;

      if(errorData?.errors && Array.isArray(errorData?.errors)) {
        const fieldErrors: Partial<typeof formData> = {};
        // Implementasi penanganan error per field jika diperlukan
      }
      else if (errorData?.message) {
        toast.error(errorData.message);
      }
      else {
        toast.error("Something went wrong!");
      }
      console.error("Update Profile:", errorData || err.message);
    }
    finally {
      setIsLoading(false);
    }
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

              <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input
                    id="nama"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Nama Lengkap"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={userStore.email} // Email tetap dari userStore karena tidak ada di formData untuk diubah
                    placeholder="Email"
                    type="email"
                    readOnly // Asumsi email tidak bisa diubah
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Nomor HP</Label>
                  <div className="rounded-md border border-gray-300 p-2">
                    <p className="text-gray-700">{formData.phone_number}</p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <div className="rounded-md border border-gray-300 p-2">
                    <p className="text-gray-700 break-words">
                      {userStore.avatar_url ?? "Tidak ada avatar"}
                    </p>
                  </div>
                </div>
              </div>

              <Button type="submit" className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white" disabled={isLoading}>
                Perbaharui Profil
              </Button>
                </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
export default Profile;