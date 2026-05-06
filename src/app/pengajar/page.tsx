"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronDown, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Heart,
  Sparkles,
  GraduationCap
} from "lucide-react";

export default function PengajarPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Data Guru (Contoh, silakan sesuaikan namanya)
  const teachers = [
    { name: "Ibu Guru A", role: "Wali Kelas TK A", hobby: "Mendongeng" },
    { name: "Ibu Guru B", role: "Wali Kelas TK B", hobby: "Bernyanyi" },
    { name: "Ibu Guru C", role: "Guru Pendamping", hobby: "Menggambar" },
    { name: "Ibu Guru D", role: "Guru Agama", hobby: "Murottal" },
    { name: "Ibu Guru E", role: "Guru Ekskul", hobby: "Menari" },
    { name: "Ibu Guru F", role: "Staf Kependidikan", hobby: "Membaca" },
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 scroll-smooth overflow-x-hidden text-left text-[#1a365d]">
      
      {/* 1. NAVBAR (IDENTIK DENGAN BERANDA & TENTANG) */}
      <nav className={`flex justify-between items-center px-8 fixed top-0 w-full z-[1000] transition-all duration-500 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-xl border-b border-gray-100 py-3" : "bg-transparent py-6"
      }`}>
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
            <Image src="/images/logo-tk.jpg" alt="Logo" fill className="object-cover" />
          </div>
          <div className={`flex flex-col transition-colors duration-500 ${isScrolled ? "text-[#1a365d]" : "text-white"}`}>
            <span className={`text-[8px] font-black uppercase tracking-[0.3em] leading-none ${isScrolled ? "text-blue-600" : "text-blue-300"}`}>Yayasan</span>
            <span className="text-sm font-black tracking-tighter leading-none uppercase">TK Baiturrahman</span>
          </div>
        </div>

        <div className={`hidden lg:flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] items-center justify-center flex-[3] transition-colors duration-500 ${
          isScrolled ? "text-[#1a365d]/80" : "text-white/90"
        }`}>
          <Link href="/" className="hover:text-blue-500 transition">Home</Link>
          <div className="relative group py-4">
            <button className="flex items-center gap-1 transition uppercase tracking-[0.2em]">
              Tentang <ChevronDown size={12} />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-3 overflow-hidden translate-y-2 group-hover:translate-y-0 text-left text-[#1a365d]">
               <Link href="/tentang#sejarah" className="block px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all border-b border-gray-50 last:border-0 text-left">Sejarah</Link>
               <Link href="/tentang#visi-misi" className="block px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all border-b border-gray-50 last:border-0 text-left">Visi & Misi</Link>
               <Link href="/tentang#pengurus" className="block px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all border-b border-gray-50 last:border-0 text-left">Pengurus</Link>
               <Link href="/pengajar" className="block px-8 py-4 text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 border-b border-gray-50 last:border-0 text-left">Pengajar</Link>
            </div>
          </div>
          <div className="relative group py-4">
            <button className="flex items-center gap-1 transition uppercase tracking-[0.2em]">
              Akademik <ChevronDown size={12} />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-3 overflow-hidden translate-y-2 group-hover:translate-y-0 text-left text-[#1a365d]">
               <Link href="/akademik/kalender" className="block px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all border-b border-gray-50 last:border-0 text-left">Jadwal Tahunan</Link>
               <Link href="/akademik/biaya" className="block px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all border-b border-gray-50 last:border-0 text-left">Biaya Pendidikan</Link>
               <Link href="/akademik/ekstrakurikuler" className="block px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all border-b border-gray-50 last:border-0 text-left">Ekstrakurikuler</Link>
            </div>
          </div>
          <Link href="/fasilitas" className="hover:text-blue-500 transition">Fasilitas</Link>
          <Link href="/prestasi" className="hover:text-blue-500 transition">Prestasi</Link>
          <Link href="/pendaftaran" className="hover:text-blue-500 transition">Pendaftaran</Link>
        </div>

        <div className="flex justify-end flex-1">
          <Link href="/login" className="px-8 py-2.5 rounded-full text-[10px] font-black uppercase bg-blue-600 text-white shadow-xl hover:bg-[#1a365d] transition-all"> Login </Link>
        </div>
      </nav>

      {/* 2. HEADER SECTION */}
      <section className="relative pt-48 pb-24 bg-[#1a365d] overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10 text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-6 text-blue-400 font-black">
            <GraduationCap size={32} />
            <span className="uppercase tracking-[0.4em] text-[10px] block">Our Educators</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Dewan Pengajar</h1>
          <p className="text-blue-400 uppercase tracking-[0.4em] text-[10px] font-black italic">Mengenal Sosok Hebat Pembimbing Ananda</p>
        </div>
      </section>

      {/* 3. TEACHERS GRID */}
      <section className="py-32 relative bg-white px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl font-black text-[#1a365d] uppercase tracking-tighter mb-6">Guru Sabar & <span className="text-blue-500 italic">Penyayang</span></h2>
            <p className="text-gray-500 font-medium leading-relaxed">
              Kami didukung oleh tenaga pendidik yang berkompeten di bidangnya, memiliki hati yang tulus, serta dedikasi tinggi dalam mendampingi tumbuh kembang putra-putri Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {teachers.map((t, idx) => (
              <TeacherCard key={idx} name={t.name} role={t.role} hobby={t.hobby} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOOTER (SAMA DENGAN BERANDA & TENTANG) */}
      <footer className="bg-[#1a365d] text-white pt-24 pb-12 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-left">
            <div className="space-y-6 lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-2xl overflow-hidden flex items-center justify-center p-1 shadow-2xl">
                  <Image src="/images/logo-tk.jpg" alt="Logo" width={48} height={48} className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 leading-none">Yayasan</span>
                  <h4 className="font-black uppercase tracking-tighter leading-tight text-lg">Baiturrahman</h4>
                </div>
              </div>
              <p className="text-white/50 text-xs font-medium leading-relaxed uppercase tracking-wider">Membentuk generasi Qur'ani yang cerdas, mandiri, dan berakhlak mulia sejak dini.</p>
              <div className="pt-2">
                <Link href="https://instagram.com/tkislambaiturrahman_" target="_blank" className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-all group">
                  <img src="https://cdn.simpleicons.org/instagram/E4405F" alt="IG" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/70 italic">@tkislambaiturrahman_</span>
                </Link>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-blue-400">Navigasi</h4>
              <ul className="space-y-4 font-bold text-white/70 uppercase text-xs tracking-widest">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/tentang" className="hover:text-white transition">Tentang Kami</Link></li>
                <li><Link href="/akademik/biaya" className="hover:text-white transition">Biaya Pendidikan</Link></li>
                <li><Link href="/pendaftaran" className="hover:text-white transition">Pendaftaran</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-blue-400">Kontak Kami</h4>
              <ul className="space-y-5 text-[11px] font-bold text-white/70">
                <li className="flex items-start gap-4 leading-relaxed group"> <MapPin size={20} className="text-blue-400 shrink-0" /> <span className="uppercase tracking-tight"> Jl. Komp. Villa Bintaro Indah Blok A VII, <br /> Jombang, Kec. Ciputat, Tangsel. </span> </li>
                <li className="flex items-center gap-4 group"> <Mail size={18} className="text-blue-400 shrink-0" /> <span className="tracking-widest lowercase">admin@tkbaiturrahman.sch.id</span> </li>
              </ul>
            </div>
            <div className="space-y-6 lg:text-right flex flex-col lg:items-end">
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-blue-400">Mari Bergabung</h4>
              <p className="text-white/50 text-[10px] font-medium uppercase tracking-widest leading-relaxed text-right">Pendaftaran 2026/2027 tersedia. Amankan kursi untuk Ananda.</p>
              <Link href="/pendaftaran" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-white hover:text-blue-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"> Daftar Sekarang <ArrowRight size={14} /> </Link>
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 text-center text-[9px] font-black uppercase tracking-[0.5em] text-white/20"> © 2026 TK Baiturrahman • Designed by Naufal </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <Link 
        href="https://wa.me/6281297332355?text=Halo%20Admin%20TK%20Baiturrahman,%20saya%20ingin%20tanya%20mengenai%20guru..." 
        target="_blank"
        className="fixed bottom-8 right-8 z-[1100] group flex items-center gap-4"
      >
        <span className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-2xl text-[11px] font-black uppercase tracking-widest text-[#1a365d] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-6 group-hover:translate-x-0 border border-white">Tanya Kami</span>
        <div className="w-16 h-16 bg-[#25D366] text-white rounded-[2rem] shadow-[0_15px_40px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 border-4 border-white relative overflow-hidden">
          <img src="https://cdn.simpleicons.org/whatsapp/white" alt="WA" className="w-8 h-8" />
          <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none rounded-full" />
        </div>
      </Link>
    </div>
  );
}

// Subcomponent: Teacher Card
function TeacherCard({ name, role, hobby }: { name: string, role: string, hobby: string }) {
  return (
    <div className="group relative bg-[#f8fafc] rounded-[3rem] p-8 border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center">
      <div className="relative w-48 h-48 mb-8 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-lg">
        <Image src="/images/pengajar.png" alt={name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
          <div className="flex gap-2">
            <Heart size={20} className="text-white fill-white" />
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-black uppercase tracking-tighter mb-2 group-hover:text-blue-600 transition-colors">{name}</h3>
        <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4 italic">{role}</p>
        
        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-sm border border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Sparkles size={14} className="text-blue-400" />
          <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Hobi: {hobby}</span>
        </div>
      </div>
    </div>
  );
}