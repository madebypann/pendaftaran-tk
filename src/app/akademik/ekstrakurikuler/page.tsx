"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronDown, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Palette, 
  Music, 
  BookOpen, 
  Languages, 
  Mic2,
  Sparkles
} from "lucide-react";

export default function EkstrakurikulerPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ekskulList = [
    { name: "Melukis", icon: <Palette size={24} />, desc: "Mengembangkan kreativitas dan imajinasi visual Ananda." },
    { name: "Menari", icon: <Music size={24} />, desc: "Melatih koordinasi gerak dan kepercayaan diri di panggung." },
    { name: "Tahfidz", icon: <Mic2 size={24} />, desc: "Menghafal Al-Qur'an dengan metode yang menyenangkan." },
    { name: "Calistung", icon: <BookOpen size={24} />, desc: "Persiapan dasar membaca, menulis, dan berhitung." },
    { name: "Bahasa Inggris", icon: <Languages size={24} />, desc: "Pengenalan kosa kata internasional sejak dini." },
    { name: "Baca Tulis Qur'an", icon: <Sparkles size={24} />, desc: "Memperdalam kemampuan membaca dan menulis huruf hijaiyah." },
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 scroll-smooth overflow-x-hidden text-left text-[#1a365d]">
      
      {/* 1. NAVBAR (KONSISTEN) */}
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
            <button className="flex items-center gap-1 transition uppercase tracking-[0.2em]">Tentang <ChevronDown size={12} /></button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-3 text-left text-[#1a365d]">
               <DropdownLink href="/tentang#sejarah" title="Sejarah" />
               <DropdownLink href="/tentang#visi-misi" title="Visi & Misi" />
               <DropdownLink href="/tentang#pengurus" title="Pengurus" />
               <DropdownLink href="/pengajar" title="Pengajar" />
            </div>
          </div>
          <div className="relative group py-4">
            <button className="flex items-center gap-1 transition text-blue-500 uppercase tracking-[0.2em]">Akademik <ChevronDown size={12} /></button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-3 text-left text-[#1a365d]">
               <DropdownLink href="/akademik/kalender" title="Jadwal Tahunan" />
               <DropdownLink href="/akademik/biaya" title="Biaya Pendidikan" />
               <DropdownLink href="/akademik/ekstrakurikuler" title="Ekstrakurikuler" active />
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
      <section className="relative pt-48 pb-20 bg-[#1a365d] overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-3">Ekstrakurikuler</h1>
          <p className="text-blue-400 uppercase tracking-[0.4em] text-[9px] font-black italic">Eksplorasi Bakat & Minat Ananda</p>
        </div>
      </section>

      {/* 3. EKSKUL GRID */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ekskulList.map((item, idx) => (
              <div key={idx} className="group border border-gray-100 p-8 rounded-[2.5rem] transition-all hover:border-blue-500 hover:shadow-xl hover:shadow-blue-900/5 flex items-start gap-6 bg-[#f8fafc]">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#1a365d] mb-2">{item.name}</h3>
                  <p className="text-[11px] font-medium text-gray-400 leading-relaxed uppercase tracking-wider italic">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 p-10 bg-[#1a365d] rounded-[3rem] text-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             <h4 className="text-white font-black uppercase tracking-tighter text-xl mb-4 relative z-10">Ingin Tahu Jadwal Kegiatan?</h4>
             <p className="text-blue-300 text-[10px] font-black uppercase tracking-[0.3em] mb-8 relative z-10">Hubungi admin untuk detail waktu pelaksanaan setiap ekstrakurikuler.</p>
             <Link href="https://wa.me/6281297332355" target="_blank" className="inline-flex items-center gap-3 bg-white text-[#1a365d] px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all relative z-10">
                Tanya Jadwal Ekskul <ArrowRight size={14} />
             </Link>
          </div>
        </div>
      </section>

      {/* 4. FOOTER (KONSISTEN) */}
      <footer className="bg-[#1a365d] text-white pt-24 pb-12 px-8 text-left">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl overflow-hidden p-1 shadow-lg text-left">
                  <Image src="/images/logo-tk.jpg" alt="Logo" width={40} height={40} className="object-contain" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-400 leading-none">Yayasan</span>
                  <h4 className="font-black uppercase tracking-tighter leading-tight text-base">Baiturrahman</h4>
                </div>
              </div>
              <p className="text-white/40 text-[10px] font-medium leading-relaxed uppercase tracking-wider text-left">Membentuk generasi Qur'ani yang cerdas, mandiri, dan berakhlak mulia sejak dini.</p>
            </div>
            
            <div className="space-y-6 text-left">
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-blue-400 pl-4 border-l-2 border-blue-400">Navigasi</h4>
              <ul className="space-y-3 text-[10px] font-bold text-white/50 uppercase tracking-widest text-left">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/tentang" className="hover:text-white">Tentang Kami</Link></li>
                <li><Link href="/akademik/ekstrakurikuler" className="text-white">Ekskul</Link></li>
              </ul>
            </div>

            <div className="space-y-6 text-left">
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-blue-400 pl-4 border-l-2 border-blue-400">Lokasi</h4>
              <div className="flex items-start gap-4 text-[10px] font-bold text-white/50 uppercase tracking-widest leading-relaxed text-left">
                <MapPin size={16} className="text-blue-400 shrink-0" />
                <span className="text-left">Villa Bintaro Indah Blok A VII, <br/> Jombang, Tangsel.</span>
              </div>
            </div>

            <div className="flex flex-col lg:items-end text-right">
              <Link href="/pendaftaran" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-blue-600 transition-all shadow-lg text-right">
                Join Now <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <div className="border-t border-white/5 pt-10 text-center text-[8px] font-black uppercase tracking-[0.5em] text-white/10 italic">
            © 2026 TK Baiturrahman • Designed by Naufal
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <Link href="https://wa.me/6281297332355" target="_blank" className="fixed bottom-8 right-8 z-[1100] group flex items-center gap-4">
        <div className="w-14 h-14 bg-[#25D366] text-white rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white relative overflow-hidden">
          <img src="https://cdn.simpleicons.org/whatsapp/white" alt="WA" className="w-6 h-6" />
        </div>
      </Link>
    </div>
  );
}

// Sub-components
function DropdownLink({ href, title, active = false }: { href: string, title: string, active?: boolean }) {
  return (
    <Link href={href} className={`block px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all border-b border-gray-50 last:border-0 ${active ? "bg-blue-50 text-blue-600" : ""}`}> {title} </Link>
  );
}