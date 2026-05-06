"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronDown, 
  Calendar as CalendarIcon, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Sparkles,
  Info
} from "lucide-react";

export default function KalenderPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Data Contoh Bulan Juli 2026
  const daysInJuly = Array.from({ length: 31 }, (_, i) => i + 1);
  
  // Penanda Tanggal (Warna)
  const getEventColor = (day: number) => {
    if (day >= 14 && day <= 18) return "bg-blue-500 text-white"; // MPLS
    if (day === 1 || day === 5 || day === 12 || day === 19 || day === 26) return "bg-red-50 text-red-500"; // Minggu
    return "bg-white text-[#1a365d]";
  };

  const legends = [
    { color: "bg-blue-500", label: "MPLS / Awal Masuk Sekolah" },
    { color: "bg-emerald-500", label: "Puncak Tema / Field Trip" },
    { color: "bg-orange-500", label: "Market Day / Baiturrahman Fair" },
    { color: "bg-purple-500", label: "Ujian / Evaluasi Belajar" },
    { color: "bg-red-500", label: "Libur Nasional / Hari Minggu" },
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 scroll-smooth overflow-x-hidden text-left text-[#1a365d]">
      
      {/* 1. NAVBAR (IDENTIK) */}
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
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-3 text-left text-[#1a365d]">
               <DropdownLink href="/tentang#sejarah" title="Sejarah" />
               <DropdownLink href="/tentang#visi-misi" title="Visi & Misi" />
               <DropdownLink href="/tentang#pengurus" title="Pengurus" />
               <DropdownLink href="/pengajar" title="Pengajar" />
            </div>
          </div>
          <div className="relative group py-4">
            <button className="flex items-center gap-1 transition text-blue-500 uppercase tracking-[0.2em]">
              Akademik <ChevronDown size={12} />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-3 text-left text-[#1a365d]">
               <DropdownLink href="/akademik/kalender" title="Jadwal Tahunan" active />
               <DropdownLink href="/akademik/biaya" title="Biaya Pendidikan" />
               <DropdownLink href="/akademik/ekstrakurikuler" title="Ekstrakurikuler" />
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

      {/* 2. HEADER */}
      <section className="relative pt-48 pb-24 bg-[#1a365d] overflow-hidden text-center text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6 text-blue-400 font-black">
            <CalendarIcon size={32} />
            <span className="uppercase tracking-[0.4em] text-[10px] block">Interactive Calendar</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-center">Jadwal Tahunan</h1>
          <p className="text-blue-400 uppercase tracking-[0.4em] text-[10px] font-black italic text-center">Visualisasi Agenda Akademik Ananda</p>
        </div>
      </section>

      {/* 3. CALENDAR GRID SECTION */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Calendar Box (Example: JULY) */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-3xl font-black uppercase tracking-tighter text-[#1a365d]">Juli <span className="text-blue-500">2026</span></h3>
               <div className="px-6 py-2 bg-blue-50 rounded-full text-[10px] font-black uppercase text-blue-600 tracking-widest italic">Semester Ganjil</div>
            </div>
            
            {/* Grid Header (Days Name) */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                <div key={day} className="text-center py-4 bg-[#f8fafc] rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400">{day}</div>
              ))}
            </div>

            {/* Grid Body (Dates) */}
            <div className="grid grid-cols-7 gap-2">
              {/* Padding for start day of month (Example: July starts on Wednesday) */}
              <div className="h-24 md:h-32 bg-transparent"></div>
              <div className="h-24 md:h-32 bg-transparent"></div>
              <div className="h-24 md:h-32 bg-transparent"></div>

              {daysInJuly.map(day => (
                <div 
                  key={day} 
                  className={`h-24 md:h-32 rounded-[2rem] border border-gray-100 p-4 transition-all hover:scale-105 flex flex-col items-center justify-center relative overflow-hidden group shadow-sm ${getEventColor(day)}`}
                >
                  <span className="text-xl md:text-3xl font-black">{day}</span>
                  {day >= 14 && day <= 18 && (
                    <span className="absolute bottom-2 text-[8px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">MPLS</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 4. LEGEND / PENJELASAN WARNA */}
          <div className="bg-[#f8fafc] rounded-[3rem] p-10 md:p-16 border border-gray-100 mt-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5"><Info size={120} /></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10 text-left">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm"><Info size={24} className="text-blue-600" /></div>
                <h4 className="text-2xl font-black uppercase tracking-tighter text-left">Keterangan <span className="text-blue-500 italic">Warna</span></h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {legends.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-gray-50 shadow-sm group hover:border-blue-200 transition-colors">
                    <div className={`w-12 h-12 rounded-2xl shrink-0 shadow-inner ${item.color}`}></div>
                    <span className="text-xs font-black uppercase tracking-widest text-gray-500 text-left group-hover:text-[#1a365d] transition-colors leading-relaxed">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. FOOTER & WA (KONSISTEN) */}
      <footer className="bg-[#1a365d] text-white pt-32 pb-12 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 text-left">
            <div className="space-y-8 text-left">
              <div className="flex items-center gap-4 text-left">
                <div className="w-14 h-14 bg-white rounded-2xl overflow-hidden p-1 shadow-2xl">
                  <Image src="/images/logo-tk.jpg" alt="Logo" width={56} height={56} className="object-contain" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 leading-none">Yayasan</span>
                  <h4 className="font-black uppercase tracking-tighter leading-tight text-xl text-left">Baiturrahman</h4>
                </div>
              </div>
              <p className="text-white/40 text-xs font-medium leading-relaxed uppercase tracking-wider text-left">Membentuk generasi Qur'ani yang cerdas, mandiri, dan berakhlak mulia sejak dini.</p>
            </div>
            <div className="space-y-8 text-left font-bold text-white/50 uppercase text-[11px] tracking-[0.2em] text-left">
              <h4 className="font-black uppercase tracking-[0.2em] text-[11px] text-blue-400 border-l-2 border-blue-400 pl-4 text-left">Navigasi</h4>
              <ul className="space-y-5 text-left">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/tentang" className="hover:text-white transition-colors">Tentang Kami</Link></li>
                <li><Link href="/akademik/biaya" className="hover:text-white transition-colors">Biaya Pendidikan</Link></li>
              </ul>
            </div>
            <div className="space-y-8 text-left font-bold text-white/50 text-left">
              <h4 className="font-black uppercase tracking-[0.2em] text-[11px] text-blue-400 border-l-2 border-blue-400 pl-4 text-left">Kontak Kami</h4>
              <ul className="space-y-6 text-[11px] text-left">
                <li className="flex items-start gap-5 leading-relaxed group text-left">
                  <MapPin size={22} className="text-blue-400 shrink-0" />
                  <span className="uppercase tracking-widest text-left">Jl. Komp. Villa Bintaro Indah <br /> Blok A VII, Jombang, Tangsel.</span>
                </li>
              </ul>
            </div>
            <div className="space-y-8 lg:text-right flex flex-col lg:items-end text-right">
              <h4 className="font-black uppercase tracking-[0.2em] text-[11px] text-blue-400 text-right">Join Us</h4>
              <Link href="/pendaftaran" className="inline-flex items-center gap-3 bg-blue-600 hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-2xl"> Daftar Sekarang <ArrowRight size={16} /> </Link>
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 flex justify-between text-[10px] font-black uppercase tracking-[0.5em] text-white/10">
            <span>© 2026 TK Baiturrahman</span>
            <span>Designed by Naufal</span>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <Link href="https://wa.me/6281297332355" target="_blank" className="fixed bottom-8 right-8 z-[1100] group flex items-center gap-4">
        <span className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-2xl text-[11px] font-black uppercase tracking-widest text-[#1a365d] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-6 group-hover:translate-x-0 border border-white">Tanya Kami</span>
        <div className="w-16 h-16 bg-[#25D366] text-white rounded-[2rem] shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 border-4 border-white relative overflow-hidden">
          <img src="https://cdn.simpleicons.org/whatsapp/white" alt="WA" className="w-8 h-8" />
        </div>
      </Link>
    </div>
  );
}

// Helper Dropdown
function DropdownLink({ href, title, active = false }: { href: string, title: string, active?: boolean }) {
  return (
    <Link href={href} className={`block px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all border-b border-gray-50 last:border-0 text-left ${active ? "bg-blue-50 text-blue-600" : ""}`}> {title} </Link>
  );
}