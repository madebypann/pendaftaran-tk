"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Users, LogOut, Search, Eye, Trash2, 
  CheckCircle2, Clock, ShieldCheck, FileStack, CreditCard, XCircle, UserCircle 
} from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AdminDashboard() {
  const [pendaftar, setPendaftar] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"pembayaran" | "berkas">("pembayaran");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const adminId = localStorage.getItem("admin_id");
    if (!adminId) {
      router.replace("/admin/login");
    } else {
      setIsAuthLoading(false);
      fetchData();
    }
  }, [router]);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("pendaftaran")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setPendaftar(data || []);
  };

  const handleVerify = async (id: string, nama: string) => {
    const result = await Swal.fire({
      title: "Verifikasi Pembayaran?",
      text: `Konfirmasi pembayaran Ananda ${nama} telah valid.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      confirmButtonText: "Ya, Verifikasi"
    });

    if (result.isConfirmed) {
      const { error } = await supabase
        .from("pendaftaran")
        .update({ status_verifikasi: "Terverifikasi" })
        .eq("id", id);

      if (!error) {
        Swal.fire("Berhasil", "Data dipindahkan ke tab Berkas.", "success");
        fetchData();
      }
    }
  };

  // FUNGSI TOLAK & HAPUS (Untuk pendaftar iseng)
  const handleReject = async (id: string, nama: string) => {
    const result = await Swal.fire({
      title: "Tolak Pendaftaran?",
      text: `Pendaftaran Ananda ${nama} akan ditolak dan data akan dihapus permanen.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Ya, Tolak & Hapus"
    });

    if (result.isConfirmed) {
      const { error } = await supabase.from("pendaftaran").delete().eq("id", id);
      if (!error) {
        Swal.fire("Ditolak", "Data pendaftar iseng telah dihapus.", "success");
        fetchData();
      }
    }
  };

  // FUNGSI VIEW DETAIL (Pop-up Data Lengkap)
  const handleViewDetail = (item: any) => {
    const berkasStatus = (url: string) => url 
      ? '<span style="color: #10b981; font-weight: 800;">[SUDAH DIUNGGAH]</span>' 
      : '<span style="color: #ef4444; font-weight: 800;">[BELUM ADA]</span>';

    Swal.fire({
      title: `<span style="font-family: sans-serif; text-transform: uppercase; font-weight: 900;">Detail Ananda ${item.nama_anak}</span>`,
      html: `
        <div style="text-align: left; font-family: sans-serif; font-size: 13px; line-height: 1.6;">
          <div style="background: #f8fafc; p: 15px; border-radius: 15px; margin-bottom: 15px; padding: 15px;">
            <p><strong>Nama Lengkap:</strong> ${item.nama_anak}</p>
            <p><strong>NIK:</strong> ${item.nik}</p>
            <p><strong>Tempat, Tgl Lahir:</strong> ${item.tempat_lahir}, ${item.tanggal_lahir}</p>
            <p><strong>Jenis Kelamin:</strong> ${item.jenis_kelamin}</p>
            <p><strong>Alamat:</strong> ${item.alamat}</p>
          </div>
          <div style="background: #eff6ff; p: 15px; border-radius: 15px; margin-bottom: 15px; padding: 15px;">
            <p><strong>Orang Tua:</strong> ${item.nama_orang_tua}</p>
            <p><strong>WhatsApp:</strong> ${item.no_hp}</p>
            <p><strong>Username Login:</strong> ${item.username}</p>
          </div>
          <div style="background: #f1f5f9; p: 15px; border-radius: 15px; padding: 15px;">
            <p><strong>STATUS BERKAS:</strong></p>
            <p>• Kartu Keluarga: ${berkasStatus(item.url_kk)}</p>
            <p>• Akte Kelahiran: ${berkasStatus(item.url_akte)}</p>
            <p>• KTP Orang Tua: ${berkasStatus(item.url_ktp)}</p>
            <p>• Pasfoto 3x4: ${berkasStatus(item.url_foto)}</p>
          </div>
        </div>
      `,
      confirmButtonText: "Tutup",
      confirmButtonColor: "#1e293b",
      width: '600px'
    });
  };

  if (isAuthLoading) return null;

  const filteredData = pendaftar.filter((item) => {
    const matchesSearch = item.nama_anak.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === "pembayaran") {
      return matchesSearch && item.status_verifikasi !== "Terverifikasi";
    } else {
      return matchesSearch && item.status_verifikasi === "Terverifikasi";
    }
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row text-left font-sans">
      {/* SIDEBAR */}
      <aside className="w-full md:w-72 bg-[#1e293b] text-white p-8 flex flex-col shadow-2xl">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="text-blue-400" size={28} />
            <h1 className="text-xl font-black uppercase tracking-tighter italic">Admin Panel</h1>
          </div>
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">TK Islam Baiturrahman</p>
        </div>
        
        <nav className="flex-1 space-y-3">
          <button onClick={() => setActiveTab("pembayaran")} className={`flex items-center gap-4 text-[10px] font-black uppercase tracking-widest p-4 rounded-2xl w-full transition-all ${activeTab === 'pembayaran' ? 'bg-blue-600 shadow-lg text-white' : 'text-gray-400 hover:bg-white/5'}`}>
            <CreditCard size={18} /> Verifikasi Bayar
          </button>
          <button onClick={() => setActiveTab("berkas")} className={`flex items-center gap-4 text-[10px] font-black uppercase tracking-widest p-4 rounded-2xl w-full transition-all ${activeTab === 'berkas' ? 'bg-blue-600 shadow-lg text-white' : 'text-gray-400 hover:bg-white/5'}`}>
            <FileStack size={18} /> Kelola Berkas
          </button>
        </nav>

        <button onClick={() => { localStorage.removeItem("admin_id"); router.replace("/admin/login"); }} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest p-4 text-red-400 mt-auto border border-transparent hover:border-red-500/20">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 md:p-14 overflow-x-hidden">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14 gap-8">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tight text-[#1e293b]">{activeTab === "pembayaran" ? "Verifikasi Bayar" : "Kelola Berkas"}</h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2 italic">Dashboard Manajemen Siswa Baru</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Cari Nama..." className="w-full pl-14 pr-8 py-5 rounded-3xl bg-white shadow-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all text-xs font-bold uppercase" onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </header>

        {/* TABEL */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-gray-100">
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Pendaftar</th>
                  {activeTab === "pembayaran" ? (
                    <>
                      <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Bukti Transfer</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Aksi</th>
                    </>
                  ) : (
                    <>
                      <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Status Berkas</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Detail</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-8">
                      <div className="font-black text-sm uppercase text-[#1e293b]">{item.nama_anak}</div>
                      <div className="text-[9px] font-bold text-blue-500 mt-1 uppercase">{item.jenjang} • {item.no_hp}</div>
                    </td>

                    {activeTab === "pembayaran" ? (
                      <>
                        <td className="p-8">
                          {item.bukti_transfer_url ? (
                            <a href={item.bukti_transfer_url} target="_blank" className="flex items-center gap-2 text-[9px] font-black uppercase text-blue-600 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                              <Eye size={14} /> Lihat Bukti
                            </a>
                          ) : <span className="text-[9px] font-black text-red-300 italic">Belum Upload</span>}
                        </td>
                        <td className="p-8 text-right">
                          <div className="flex justify-end gap-3">
                            <button onClick={() => handleVerify(item.id, item.nama_anak)} className="p-4 bg-green-500 text-white rounded-2xl hover:bg-green-600 shadow-lg shadow-green-200 transition-all" title="Verifikasi">
                              <CheckCircle2 size={18} />
                            </button>
                            <button onClick={() => handleReject(item.id, item.nama_anak)} className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all" title="Tolak Pendaftar Iseng">
                              <XCircle size={18} />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-8">
                           <div className="flex justify-center gap-2">
                             <FileBadge label="KK" active={!!item.url_kk} url={item.url_kk} />
                             <FileBadge label="Akte" active={!!item.url_akte} url={item.url_akte} />
                             <FileBadge label="KTP" active={!!item.url_ktp} url={item.url_ktp} />
                             <FileBadge label="Foto" active={!!item.url_foto} url={item.url_foto} />
                           </div>
                        </td>
                        <td className="p-8 text-right">
                          <button onClick={() => handleViewDetail(item)} className="p-4 bg-[#1e293b] text-white rounded-2xl hover:bg-blue-600 shadow-lg transition-all">
                            <UserCircle size={18} />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function FileBadge({ label, active, url }: { label: string, active: boolean, url?: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${active ? 'bg-green-100 text-green-600 border-green-200' : 'bg-gray-50 text-gray-300 border-dashed border-gray-200'}`}>
        {active ? <a href={url} target="_blank"><CheckCircle2 size={16} /></a> : <Clock size={16} />}
      </div>
      <span className="text-[8px] font-black uppercase text-gray-400">{label}</span>
    </div>
  );
}