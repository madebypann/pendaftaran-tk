"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { supabase } from "@/lib/supabase";
import { ShieldCheck, Lock, User, ArrowRight } from "lucide-react";

export default function LoginAdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLoginAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single();

      if (error || !data) throw new Error("Akses Ditolak: Kredensial Admin Salah.");

      Swal.fire({ icon: "success", title: "Akses Admin Diterima", timer: 1500, showConfirmButton: false });
      localStorage.setItem("admin_id", data.id);
      router.push("/admin/dashboard");

    } catch (err: any) {
      Swal.fire("Akses Ditolak", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6 text-left">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-12 border-t-[10px] border-red-600 shadow-2xl">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-4">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-xl font-black uppercase text-gray-800 tracking-tighter">Admin Control Panel</h2>
          <p className="text-[9px] font-black uppercase text-gray-400 tracking-[0.3em] mt-2 text-center">Internal Use Only</p>
        </div>

        <form onSubmit={handleLoginAdmin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-red-600 ml-2 tracking-widest">Admin ID</label>
            <div className="relative">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input name="username" type="text" required placeholder="ID Petugas"
                className="w-full pl-16 pr-6 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white outline-none transition-all font-bold text-sm" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-red-600 ml-2 tracking-widest">Secret Key</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input name="password" type="password" required placeholder="********"
                className="w-full pl-16 pr-6 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-red-600 focus:bg-white outline-none transition-all font-bold text-sm" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-red-600 text-white py-5 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95 disabled:opacity-50">
            {loading ? "Authenticating..." : "Authorize Login"} <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-10 text-center">
          <Link href="/" className="text-[9px] font-black uppercase text-gray-400 hover:text-red-600 transition-colors tracking-widest"> Kembali ke Beranda </Link>
        </div>
      </div>
    </div>
  );
}