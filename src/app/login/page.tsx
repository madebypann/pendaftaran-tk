"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { supabase } from "@/lib/supabase";
import { Lock, User, ArrowRight } from "lucide-react";

export default function LoginSiswaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await supabase
        .from("pendaftaran")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single();

      if (error || !data) throw new Error("Username atau Password salah!");

      Swal.fire({ icon: "success", title: `Halo, ${data.nama_orang_tua}`, timer: 1500, showConfirmButton: false });
      localStorage.setItem("user_id", data.id);
      router.push("/siswa/dashboard");

    } catch (err: any) {
      Swal.fire("Gagal", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a365d] flex items-center justify-center p-6 text-left">
      <div className="w-full max-w-md bg-white rounded-[3rem] p-12 shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-[#1a365d]">Login Orang Tua</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 text-center">Portal Pendaftaran Siswa</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-blue-600 ml-2">Username</label>
            <div className="relative">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input name="username" type="text" required placeholder="Username pendaftaran"
                className="w-full pl-16 pr-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-sm" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-blue-600 ml-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input name="password" type="password" required placeholder="********"
                className="w-full pl-16 pr-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-sm" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-[#1a365d] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-50">
            {loading ? "Mengecek..." : "Masuk Sekarang"} <ArrowRight size={16} />
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] font-bold text-gray-400 uppercase">
          Belum daftar? <Link href="/pendaftaran" className="text-blue-600 hover:underline">Klik di sini</Link>
        </p>
      </div>
    </div>
  );
}