"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronDown, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  Home
} from "lucide-react";

export default function FasilitasPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fasilitasData = [
    { 
      title: "Ruang Kelas Ber-AC", 
      desc: "Ruang belajar yang sejuk dan nyaman untuk mendukung fokus belajar Ananda.", 
      img: "/images/2.png" 
    },
    { 
      title: "Halaman Bermain Luas", 
      desc: "Area terbuka yang aman untuk melatih motorik kasar dan bersosialisasi.", 
      img: "/images/1.png" 
    },
    { 
      title: "Aula Performa Siswa", 
      desc: "Wadah bagi Ananda untuk berani tampil dan menunjukkan bakat seninya.", 
      img: "/images/3.png" 
    },
    { 
      title: "Masjid Baiturrahman", 
      desc: "Tempat praktek wudhu dan shalat berjamaah untuk membiasakan adab Islami.", 
      img: "/images/hero.png" 
    },
    { 
      title: "2 Kamar Mandi Bersih", 
      desc: "Fasilitas sanitasi yang terjaga kebersihannya dan ramah anak.", 
      img: "/images/2.png" 
    },
    { 
      title: "Sarana Parkir", 
      desc: "Area parkir yang tertata untuk kenyamanan orang tua saat antar jemput.", 
      img: "/images/1.png" 
    }
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
            <button className="flex items-center gap-1 transition uppercase tracking-[0.2em]">
              Tentang <ChevronDown size={12} />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-3 text-left text-[#1a365d]">
               <Link href="/tentang#sejarah" className="block px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50">Sejarah</Link>
               <Link href="/tentang#visi-misi" className="block px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50">Visi & Misi</Link>
               <Link href="/tentang#pengurus" className="block px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50">Pengurus</Link>
               <Link href="/pengajar" className="block px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50">Pengajar</Link>
            </div>
          </div>
          <div className="relative group py-4">
            <button className="flex items-center gap-1 transition uppercase tracking-[0.2em]">
              Akademik <ChevronDown size={12} />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-3 text-left text-[#1a365d]">
               <Link href="/akademik/kalender" className="block px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50">Jadwal Tahunan</Link>
               <Link href="/akademik/biaya" className="block px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50">Biaya Pendidikan</Link>
               <Link href="/akademik/ekstrakurikuler" className="block px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-blue-50">Ekstrakurikuler</Link>
            </div>
          </div>
          <Link href="/fasilitas" className="text-blue-500 transition font-black uppercase tracking-[0.2em] text-[10px]">Fasilitas</Link>
          <Link href="/prestasi" className="hover:text-blue-500 transition">Prestasi</Link>
          <Link href="/pendaftaran" className="hover:text-blue-500 transition">Pendaftaran</Link>
        </div>

        <div className="flex justify-end flex-1">
          <Link href="/login" className="px-8 py-2.5 rounded-full text-[10px] font-black uppercase bg-blue-600 text-white shadow-xl hover:bg-[#1a365d] transition-all"> Login </Link>
        </div>
      </nav>

      {/* 2. HEADER */}
      <section className="relative pt-48 pb-24 bg-[#1a365d] overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10 text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-6 text-blue-400 font-black">
            <Home size={32} />
            <span className="uppercase tracking-[0.4em] text-[10px] block">Learning Environment</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Sarana & Fasilitas</h1>
          <p className="text-blue-400 uppercase tracking-[0.4em] text-[10px] font-black italic">Lingkungan Belajar yang Aman & Nyaman</p>
        </div>
      </section>

      {/* 3. FACILITIES BENTO GRID */}
      <section className="py-32 relative bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fasilitasData.map((item, idx) => (
              <FacilityCard key={idx} title={item.title} desc={item.desc} img={item.img} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-[#1a365d] text-white pt-24 pb-12 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-left">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-2xl overflow-hidden flex items-center justify-center p-1 shadow-2xl">
                  <Image src="/images/logo-tk.jpg" alt="Logo" width={48} height={48} className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 leading-none">Yayasan</span>
                  <h4 className="font-black uppercase tracking-tighter leading-tight text-lg text-left">Baiturrahman</h4>
                </div>
              </div>
              <p className="text-white/50 text-xs font-medium leading-relaxed uppercase tracking-wider text-left">Membentuk generasi Qur'ani yang cerdas, mandiri, dan berakhlak mulia sejak dini.</p>
            </div>
            <div className="space-y-6">
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-blue-400">Navigasi</h4>
              <ul className="space-y-4 font-bold text-white/70 uppercase text-xs tracking-widest uppercase">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/tentang" className="hover:text-white transition">Tentang Kami</Link></li>
                <li><Link href="/akademik/biaya" className="hover:text-white transition">Biaya Pendidikan</Link></li>
                <li><Link href="/pendaftaran" className="hover:text-white transition">Pendaftaran</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-blue-400">Kontak Kami</h4>
              <ul className="space-y-5 text-[11px] font-bold text-white/70 text-left">
                <li className="flex items-start gap-4 group"> <MapPin size={20} className="text-blue-400 shrink-0" /> <span className="uppercase tracking-tight text-left"> Villa Bintaro Indah Blok A VII, <br /> Ciputat, Tangsel. </span> </li>
              </ul>
            </div>
            <div className="space-y-6 lg:text-right flex flex-col lg:items-end">
              <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-blue-400">Join Us</h4>
              <Link href="/pendaftaran" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-white hover:text-blue-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"> Daftar Sekarang <ArrowRight size={14} /> </Link>
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 text-center text-[9px] font-black uppercase tracking-[0.5em] text-white/20"> © 2026 TK Baiturrahman • Designed by Naufal </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <Link href="https://wa.me/6281297332355" target="_blank" className="fixed bottom-8 right-8 z-[1100] group flex items-center gap-4">
        <span className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-2xl text-[11px] font-black uppercase tracking-widest text-[#1a365d] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-6 group-hover:translate-x-0 border border-white">Tanya Kami</span>
        <div className="w-16 h-16 bg-[#25D366] text-white rounded-[2rem] shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 border-4 border-white">
          <img src="https://cdn.simpleicons.org/whatsapp/white" alt="WA" className="w-8 h-8" />
        </div>
      </Link>
    </div>
  );
}

// Subcomponent: Facility Card
function FacilityCard({ title, desc, img }: { title: string, desc: string, img: string }) {
  return (
    <div className="group bg-[#f8fafc] rounded-[3rem] overflow-hidden border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col">
      <div className="relative h-64 overflow-hidden">
        <Image src={img} alt={title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-[#1a365d]/20 group-hover:bg-transparent transition-colors duration-500"></div>
      </div>
      <div className="p-10 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4 text-blue-600">
          <CheckCircle2 size={18} />
          <h3 className="text-lg font-black uppercase tracking-tighter group-hover:text-blue-600 transition-colors">{title}</h3>
        </div>
        <p className="text-gray-500 text-[13px] font-medium leading-relaxed italic">"{desc}"</p>
      </div>
    </div>
  );
}