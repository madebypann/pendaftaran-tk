"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Upload, CheckCircle2, Loader2, Camera, ShieldCheck } from "lucide-react";
import Swal from "sweetalert2";

export default function UploadBerkasPage() {
  const router = useRouter();
  const [loadingField, setLoadingField] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    if (!id) router.push("/login");
    setUserId(id);
  }, [router]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    // Validasi Ukuran (Maks 2MB)
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire("File Terlalu Besar", "Maksimal ukuran file adalah 2MB", "warning");
      return;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${fieldName}-${Date.now()}.${fileExt}`;
    
    setLoadingField(fieldName);
    try {
      // 1. Upload ke Storage
      const { error: uploadError } = await supabase.storage
        .from('berkas-siswa')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Ambil URL
      const { data: { publicUrl } } = supabase.storage
        .from('berkas-siswa')
        .getPublicUrl(fileName);

      // 3. Update DB
      const { error: dbError } = await supabase
        .from('pendaftaran')
        .update({ [fieldName]: publicUrl })
        .eq('id', userId);

      if (dbError) throw dbError;

      Swal.fire({ icon: 'success', title: 'Berhasil Diunggah', timer: 1500, showConfirmButton: false });
    } catch (err: any) {
      Swal.fire('Gagal', err.message, 'error');
    } finally {
      setLoadingField(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-16 text-left">
      <div className="max-w-xl mx-auto text-left">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-blue-600 font-black uppercase text-[10px] tracking-[0.2em] mb-10 hover:gap-4 transition-all text-left">
          <ArrowLeft size={16} /> Kembali ke Dashboard
        </button>

        <div className="bg-white rounded-[3.5rem] p-12 md:p-16 shadow-2xl border border-white text-left">
          <header className="mb-12 text-left">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
               <ShieldCheck size={24} />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-[#1a365d]">Unggah Dokumen</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Format: JPG, PNG, atau PDF (Maks 2MB)</p>
          </header>

          <div className="space-y-6 text-left">
            <UploadBox label="Foto Kartu Keluarga" field="url_kk" onUpload={handleUpload} isLoading={loadingField === 'url_kk'} />
            <UploadBox label="Foto Akte Kelahiran" field="url_akte" onUpload={handleUpload} isLoading={loadingField === 'url_akte'} />
            <UploadBox label="Foto KTP Orang Tua" field="url_ktp" onUpload={handleUpload} isLoading={loadingField === 'url_ktp'} />
            <UploadBox label="Pasfoto Calon Siswa (3x4)" field="url_foto" onUpload={handleUpload} isLoading={loadingField === 'url_foto'} />
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadBox({ label, field, onUpload, isLoading }: any) {
  return (
    <div className="relative group text-left">
      <label className="text-[9px] font-black uppercase tracking-widest text-blue-600 ml-4 mb-3 block text-left">{label}</label>
      <div className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all p-6 flex items-center justify-between ${isLoading ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200 group-hover:border-blue-400 group-hover:bg-blue-50'}`}>
        <input 
          type="file" 
          onChange={(e) => onUpload(e, field)}
          disabled={isLoading}
          className="absolute inset-0 opacity-0 cursor-pointer z-20" 
          accept="image/*,application/pdf"
        />
        <div className="flex items-center gap-4 text-left">
          <div className={`p-3 rounded-xl ${isLoading ? 'bg-blue-600 text-white animate-spin' : 'bg-white text-gray-400 group-hover:text-blue-600'}`}>
            {isLoading ? <Loader2 size={18} /> : <Camera size={18} />}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-[#1a365d] text-left">
            {isLoading ? 'Sedang Memproses...' : 'Klik untuk Unggah'}
          </span>
        </div>
        {!isLoading && <Upload className="text-gray-200 group-hover:text-blue-200" size={20} />}
      </div>
    </div>
  );
}