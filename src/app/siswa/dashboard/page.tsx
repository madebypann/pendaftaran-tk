"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  User, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  Upload,
  AlertCircle,
  LayoutDashboard,
  FileCheck
} from "lucide-react";
import Swal from "sweetalert2";

// Komponen Kecil untuk Baris Status Berkas
function StatusFile({ label, isUploaded }: { label: string, isUploaded: boolean }) {
  return (
    <div className="flex justify-between items-center p-5 bg-gray-50 rounded-2xl border border-gray-100">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${isUploaded ? 'bg-green-500' : 'bg-red-400 animate-pulse'}`}></div>
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{label}</span>
      </div>
      {isUploaded ? (
        <span className="text-[9px] font-black uppercase text-green-600 bg-green-50 px-3 py-1 rounded-lg border border-green-100">Tersedia</span>
      ) : (
        <span className="text-[9px] font-black uppercase text-red-400">Belum Ada</span>
      )}
    </div>
  );
}

export default function SiswaDashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      router.replace("/login");
    } else {
      fetchUserData(userId);
    }
  }, [router]);

  const fetchUserData = async (id: string) => {
    const { data, error } = await supabase
      .from("pendaftaran")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      localStorage.removeItem("user_id");
      router.replace("/login");
    } else {
      setUserData(data);
      setIsAuthLoading(false);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Keluar Akun?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1a365d",
      confirmButtonText: "Ya, Keluar"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user_id");
        router.replace("/login");
      }
    });
  };

  if (isAuthLoading) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row text-left font-sans text-left">
      {/* SIDEBAR */}
      <aside className="w-full md:w-80 bg-[#1a365d] text-white p-10 flex flex-col shadow-2xl">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2 text-left">
            <LayoutDashboard className="text-blue-400" size={24} />
            <h1 className="text-xl font-black uppercase tracking-tighter italic">Panel Siswa</h1>
          </div>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 text-left">TK Islam Baiturrahman</p>
        </div>
        <nav className="flex-1 space-y-3 text-left">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest bg-blue-600/20 p-4 rounded-2xl w-full text-blue-400 border border-blue-600/30">
            <User size={18} /> Profil Ananda
          </div>
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest p-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all mt-auto border border-transparent hover:border-red-500/20">
          <LogOut size={18} /> Keluar
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 md:p-16 overflow-y-auto text-left">
        <header className="mb-14 text-left">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-[#1a365d]">Assalamu'alaikum, Bunda!</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-3">Silakan pantau status berkas Ananda di bawah ini.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-10 text-left">
          <div className="lg:col-span-2 space-y-10 text-left">
            {/* STATUS PEMBAYARAN */}
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-white text-left">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-8">Status Verifikasi Admin</h3>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest flex items-center gap-3 ${
                  userData.status_verifikasi === 'Terverifikasi' ? 'bg-green-100 text-green-700' : 'bg-yellow-50 text-yellow-700 border border-yellow-100'
                }`}>
                  {userData.status_verifikasi === 'Terverifikasi' ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                  {userData.status_verifikasi}
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-tight max-w-sm">
                  {userData.status_verifikasi === 'Terverifikasi' 
                    ? "Pembayaran Terkonfirmasi. Silakan lengkapi berkas fisik di menu samping."
                    : "Menunggu Admin mengecek bukti transfer Anda. Harap cek berkala."}
                </p>
              </div>
            </div>

            {/* INFO DATA */}
            <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-white grid md:grid-cols-2 gap-10 text-left">
              <div className="md:col-span-2 flex items-center gap-4 border-b border-gray-50 pb-6">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1a365d]">Identitas Siswa</h3>
              </div>
              <InfoItem label="Nama Lengkap" value={userData.nama_anak} />
              <InfoItem label="Jenjang" value={userData.jenjang} />
              <InfoItem label="Nama Orang Tua" value={userData.nama_orang_tua} />
              <InfoItem label="NIK" value={userData.nik} />
            </div>
          </div>

          {/* KELENGKAPAN BERKAS */}
          <div className="space-y-8 text-left">
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-white text-left">
              <div className="flex items-center justify-between mb-8 text-left">
                <h4 className="text-sm font-black uppercase tracking-widest text-[#1a365d]">Kelengkapan Berkas</h4>
                <FileCheck className="text-blue-100" size={32} />
              </div>
              
              <div className="space-y-3 text-left">
                <StatusFile label="Kartu Keluarga" isUploaded={!!userData?.url_kk} />
                <StatusFile label="Akte Kelahiran" isUploaded={!!userData?.url_akte} />
                <StatusFile label="KTP Orang Tua" isUploaded={!!userData?.url_ktp} />
                <StatusFile label="Pasfoto 3x4" isUploaded={!!userData?.url_foto} />
              </div>

              {/* Ganti bagian pengecekan tombol dengan kode yang lebih kuat ini */}
                {userData?.status_verifikasi === "Terverifikasi" ? (
                <button 
                    onClick={() => router.push("/siswa/dashboard/upload")}
                    className="w-full mt-8 bg-green-600 hover:bg-green-700 py-5 rounded-2xl text-[10px] font-black uppercase text-white transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-100"
                >
                    <Upload size={16} /> Kelola Dokumen
                </button>
                ) : (
                <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-dashed border-amber-200 text-left">
                    <p className="text-[9px] font-bold text-amber-600 uppercase text-center leading-relaxed italic">
                    Akses unggah berkas akan terbuka jika Admin sudah memverifikasi pembayaran Anda. 
                    <br/>(Status Saat Ini: {userData?.status_verifikasi || "Menunggu"})
                    </p>
                </div>
                )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function InfoItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="text-left">
      <p className="text-[9px] font-black uppercase text-gray-400 tracking-[0.2em] mb-2">{label}</p>
      <p className="text-sm font-black uppercase text-[#1a365d]">{value}</p>
    </div>
  );
}