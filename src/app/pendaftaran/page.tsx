"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  UserPlus, ShieldCheck, ArrowRight, Loader2, Info, CheckCircle2, CreditCard, FileText, X, Upload
} from "lucide-react";
import Swal from "sweetalert2";

// Import komponen yang sudah kita buat sebelumnya
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PendaftaranPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nama_anak: "",
    nik: "",
    jenjang: "TK A",
    jenis_kelamin: "Laki-laki",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    nama_orang_tua: "",
    no_hp: "",
  });
  const [buktiFile, setBuktiFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const ext = file.name.split('.').pop()?.toLowerCase();
      // Pembatasan format sesuai keamanan bucket yang kita buat
      if (!['png', 'jpg', 'jpeg', 'pdf'].includes(ext || '')) {
        Swal.fire("Format Salah", "Hanya diperbolehkan PNG, JPG, atau PDF", "error");
        return;
      }
      setBuktiFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buktiFile) return Swal.fire("Bukti Bayar!", "Mohon unggah bukti transfer pendaftaran.", "warning");

    setLoading(true);
    try {
      // 1. Upload Bukti Transfer ke Storage berkas-siswa
      const fileExt = buktiFile.name.split('.').pop();
      const fileName = `bukti-${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('berkas-siswa')
        .upload(fileName, buktiFile);

      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('berkas-siswa').getPublicUrl(fileName);

      // 2. Simpan ke database pendaftaran yang sudah rapi
      const { error: dbError } = await supabase.from('pendaftaran').insert([{
        ...formData,
        bukti_transfer_url: publicUrl,
        status_verifikasi: 'Menunggu'
      }]);

      if (dbError) throw dbError;

      await Swal.fire({ 
        icon: 'success', 
        title: 'Berhasil!', 
        text: 'Data Anda telah tersimpan. Mohon tunggu verifikasi admin.', 
        confirmButtonColor: '#1a365d' 
      });
      router.push('/login');
    } catch (err: any) {
      Swal.fire('Gagal', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      {/* NAVBAR UTAMA */}
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20 px-6">
        {!isAgreed ? (
          /* SECTION SYARAT & KETENTUAN */
          <div className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl p-10 md:p-16 border border-white animate-in fade-in duration-500">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <Info size={24} />
              </div>
              <h1 className="text-2xl font-black uppercase tracking-tighter text-[#1a365d]">Syarat Pendaftaran</h1>
            </div>

            <div className="space-y-8 mb-12">
              <section className="text-left">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4 flex items-center gap-2">Batas Usia (Juni 2026)</h3>
                <div className="grid grid-cols-3 gap-4">
                  {["KB (3 Thn)", "TK A (4 Thn)", "TK B (5 Thn)"].map((v) => (
                    <div key={v} className="bg-gray-50 p-4 rounded-2xl text-[9px] font-black uppercase text-center text-gray-500 border border-gray-100">{v}</div>
                  ))}
                </div>
              </section>

              <section className="p-6 bg-[#1a365d] rounded-[2rem] text-white shadow-xl text-left">
                <div className="flex items-start gap-4">
                  <CreditCard size={24} className="text-blue-400" />
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">Biaya Formulir: Rp 250.000</h4>
                    <p className="text-[11px] font-bold opacity-70 mb-4 italic">Transfer ke Rekening BSI:</p>
                    <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                      <p className="text-lg font-black tracking-[0.2em]">9999 7887 74</p>
                      <p className="text-[8px] font-black uppercase mt-1 opacity-60">An. TK Islam Baiturrahman</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <button onClick={() => setIsAgreed(true)} className="w-full bg-[#1a365d] hover:bg-blue-600 py-6 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3">
              Saya Mengerti & Lanjut <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          /* FORMULIR PENDAFTARAN */
          <div className="max-w-5xl w-full bg-white rounded-[3.5rem] shadow-2xl border border-white overflow-hidden flex flex-col md:flex-row animate-in slide-in-from-bottom duration-700">
            <div className="md:w-1/3 bg-[#1a365d] p-12 text-white flex flex-col justify-between text-left">
              <div>
                <ShieldCheck size={40} className="text-blue-400 mb-6" />
                <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-4 text-white">Lengkapi<br/>Data Siswa</h2>
                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest italic opacity-60">
                  Data ini akan digunakan untuk keperluan administrasi sekolah.
                </p>
              </div>
              <button onClick={() => setIsAgreed(false)} className="text-[10px] font-black uppercase tracking-widest text-blue-300 hover:text-white flex items-center gap-2">
                <X size={14} /> Kembali ke Syarat
              </button>
            </div>

            <form onSubmit={handleSubmit} className="md:w-2/3 p-10 md:p-16 space-y-12 bg-white">
              <section className="text-left">
                <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-8 border-l-4 border-blue-600 pl-4">Identitas & Akun</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <InputGroup label="Username" name="username" value={formData.username} onChange={handleChange} required />
                  <InputGroup label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                  <div className="md:col-span-2">
                    <InputGroup label="Nama Lengkap Anak" name="nama_anak" value={formData.nama_anak} onChange={handleChange} required />
                  </div>
                  <InputGroup label="NIK (Sesuai KK)" name="nik" value={formData.nik} onChange={handleChange} required />
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Jenjang</label>
                    <select name="jenjang" onChange={handleChange} className="w-full p-5 rounded-2xl bg-gray-50 border-none text-[11px] font-black uppercase text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-inner">
                      <option value="KB">KB</option>
                      <option value="TK A">TK A</option>
                      <option value="TK B">TK B</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="text-left">
                <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-8 border-l-4 border-blue-600 pl-4">Data Wali & Alamat</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <InputGroup label="Nama Orang Tua" name="nama_orang_tua" value={formData.nama_orang_tua} onChange={handleChange} required />
                  <InputGroup label="Nomor WhatsApp" name="no_hp" value={formData.no_hp} onChange={handleChange} required />
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Alamat Lengkap</label>
                    <textarea name="alamat" onChange={handleChange} required className="w-full p-5 rounded-2xl bg-gray-50 border-none text-[11px] font-black uppercase text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 transition-all min-h-[120px] shadow-inner"></textarea>
                  </div>
                </div>
              </section>

              <section className="text-left">
                <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-8 border-l-4 border-blue-600 pl-4">Bukti Transfer Pendaftaran</h3>
                <div className={`p-10 rounded-[2.5rem] border-2 border-dashed transition-all relative group ${buktiFile ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                  {!buktiFile ? (
                    <div className="flex flex-col items-center text-center">
                      <input type="file" onChange={handleFileChange} accept=".png,.jpg,.jpeg,.pdf" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                      <Upload className="text-blue-600 mb-3" size={24} />
                      <p className="text-[10px] font-black uppercase text-[#1a365d]">Unggah Bukti Bayar</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <FileText className="text-green-600" size={24} />
                        <span className="text-[10px] font-black text-green-700 uppercase line-clamp-1">{buktiFile.name}</span>
                      </div>
                      <button type="button" onClick={() => setBuktiFile(null)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"><X size={18} /></button>
                    </div>
                  )}
                </div>
              </section>

              <button type="submit" disabled={loading} className="w-full bg-[#1a365d] hover:bg-blue-600 py-7 rounded-[2rem] text-white text-[11px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-xl">
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Kirim Pendaftaran"}
              </button>
            </form>
          </div>
        )}
      </main>

      {/* FOOTER UTAMA */}
      <Footer />
    </div>
  );
}

function InputGroup({ label, name, type = "text", value, onChange, required }: any) {
  return (
    <div className="flex flex-col gap-2 text-left">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">{label}</label>
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange} 
        required={required}
        className="w-full p-5 rounded-2xl bg-gray-50 border-none text-[11px] font-black uppercase text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-inner"
      />
    </div>
  );
}