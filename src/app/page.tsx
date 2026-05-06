"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ChevronDown, 
  ArrowRight, 
  Mail, 
  MapPin,
  Sparkles
} from "lucide-react";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      img: "/images/hero.png",
      title: "Cerdas Berakhlak",
      sub: "Pendaftaran Siswa Baru KB & TK Baiturrahman Tahun 2026/2027 Telah Dibuka!"
    },
    {
      img: "/images/1.png",
      title: "Bermain & Belajar",
      sub: "Lingkungan yang aman dan menyenangkan untuk tumbuh kembang Ananda."
    },
    {
      img: "/images/2.png",
      title: "Generasi Qur'ani",
      sub: "Membentuk karakter Islami melalui pembiasaan akhlak Nabi sejak dini."
    }
  ];

  const kegiatanList = [
    { title: "Praktek Sholat & Wudhu", desc: "Membangun kedisiplinan ibadah sejak dini.", img: "/images/1.png" },
    { title: "Manasik Haji", desc: "Simulasi ibadah haji yang edukatif.", img: "/images/2.png" },
    { title: "Market Day", desc: "Belajar kewirausahaan dan berhitung.", img: "/images/3.png" },
    { title: "Iqro & Hafalan Juz 30", desc: "Membentuk generasi cinta Al-Qur'an.", img: "/images/hero.png" },
    { title: "Cooking Class", desc: "Melatih motorik halus dan kreativitas.", img: "/images/1.png" },
    { title: "Outing", desc: "Eksplorasi dunia luar yang menyenangkan.", img: "/images/2.png" },
    { title: "Pentas Seni", desc: "Wadah ekspresi dan kepercayaan diri anak.", img: "/images/3.png" },
    { title: "Kemandirian", desc: "Latihan kemandirian dalam aktivitas harian.", img: "/images/hero.png" },
  ];

  // PERBAIKAN: Ganti nama fungsi agar tidak bentrok dengan window.scroll
  const handleScrollKegiatan = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector('div')?.clientWidth || 0;
      const gap = 24;
      const moveDistance = cardWidth + gap;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      if (direction === "right") {
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollTo({ left: scrollLeft + moveDistance, behavior: "smooth" });
        }
      } else {
        if (scrollLeft <= 0) {
          scrollRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
        } else {
          scrollRef.current.scrollTo({ left: scrollLeft - moveDistance, behavior: "smooth" });
        }
      }
    }
  };

  useEffect(() => {
    const handleScrollNavbar = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScrollNavbar);
    return () => window.removeEventListener("scroll", handleScrollNavbar);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 scroll-smooth overflow-x-hidden text-left text-[#1a365d]">
      
      {/* 1. NAVBAR */}
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
               <DropdownLink href="/tentang#sejarah" title="Sejarah" />
               <DropdownLink href="/tentang#visi-misi" title="Visi & Misi" />
               <DropdownLink href="/tentang#pengurus" title="Pengurus" />
               <DropdownLink href="/pengajar" title="Pengajar" />
            </div>
          </div>
          <div className="relative group py-4">
            <button className="flex items-center gap-1 transition uppercase tracking-[0.2em]">
              Akademik <ChevronDown size={12} />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-3 overflow-hidden translate-y-2 group-hover:translate-y-0 text-left text-[#1a365d]">
               <DropdownLink href="/akademik/kalender" title="Jadwal Tahunan" />
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

      {/* 2. HERO CAROUSEL */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-[#1a365d]">
        {slides.map((slide, index) => (
          <div key={index} className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}>
            <Image src={slide.img} alt={slide.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a365d]/60 via-[#1a365d]/40 to-[#1a365d]/90" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-white">
              <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.85] uppercase">
                {slide.title.split(' ')[0]} <br/> <span className="text-blue-400">{slide.title.split(' ')[1]}</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-50 max-w-2xl font-medium mb-10 drop-shadow-md">{slide.sub}</p>
              <Link href="/pendaftaran" className="bg-blue-600 text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-white hover:text-blue-600 transition-all duration-500 hover:scale-105 active:scale-95">Mulai Pendaftaran</Link>
            </div>
          </div>
        ))}
        {/* Carousel Navigation Buttons */}
        <button onClick={() => setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)} className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all shadow-2xl"><ChevronLeft size={24} /></button>
        <button onClick={() => setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)} className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all shadow-2xl"><ChevronRight size={24} /></button>
      </section>

      {/* 2.5 SECTION SEKILAS */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Sekilas Kami</span>
          <h2 className="text-4xl md:text-6xl font-black text-[#1a365d] uppercase tracking-tighter mb-8 leading-tight">TK ISLAM <br/> <span className="text-blue-500 italic">BAITURRAHMAN</span></h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed italic mb-10 max-w-2xl text-center">
            "Membentuk buah hati Anda tumbuh menjadi pribadi yang cerdas secara intelektual dan mulia secara akhlak."
          </p>
          <Link href="/tentang" className="group flex items-center gap-3 text-blue-600 font-black uppercase tracking-widest text-[11px] border-2 border-blue-50 px-8 py-4 rounded-2xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
            Lihat Selengkapnya <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 3. STRATEGI PEMBELAJARAN (Opsi 1: Gelap) */}
      <section className="py-32 relative bg-[#1a365d] px-6 overflow-hidden">
        <div className="max-w-[1450px] mx-auto text-center relative z-10">
          <div className="mb-20">
             <span className="text-blue-400 font-black uppercase tracking-[0.4em] text-[10px] mb-3 block">Metodologi Kami</span>
             <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
               Strategi <span className="text-blue-400 italic">Pembelajaran</span>
             </h2>
             <div className="w-20 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <LargeIconCard icon="📚" title="Kurikulum Terpadu" desc="Menggunakan kurikulum merdeka bermain dan kurikulum TK Islam Baiturrahman." />
            <LargeIconCard icon="🧒" title="Berpusat Pada Anak" desc="Pembelajaran berpusat pada anak dengan pendekatan berdiferensiasi." />
            <LargeIconCard icon="🌙" title="Pendidikan Karakter" desc="Mengajarkan pendidikan karakter yang berbasis pembiasaan." />
            <LargeIconCard icon="🚀" title="Berbasis STEAM" desc="Pembelajaran berbasis STEAM (Science, Tech, Engineering, Art, Math)." />
            <LargeIconCard icon="❤️" title="Pendidik Penyayang" desc="Guru yang sabar dan penyayang dalam mendampingi tumbuh kembang Ananda." />
          </div>
        </div>
      </section>

      {/* 4. KEGIATAN UNGGULAN (FIXED: handleScrollKegiatan) */}
      <section id="kegiatan" className="py-32 bg-white overflow-hidden relative">
        <div className="max-w-[1450px] mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-2 text-blue-600 font-black">
              <Sparkles size={20} />
              <span className="uppercase tracking-[0.4em] text-[10px] block">Fun Activities</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a365d] uppercase tracking-tighter text-center">Kegiatan <span className="text-blue-500 italic">Unggulan</span></h2>
          </div>

          <div className="relative group px-4">
            {/* Navigasi Melayang Samping */}
            <button 
              onClick={() => handleScrollKegiatan("left")} 
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 rounded-full bg-white text-[#1a365d] flex items-center justify-center shadow-2xl border border-gray-100 hover:bg-blue-600 hover:text-white transition-all active:scale-90"
            >
              <ChevronLeft size={24}/>
            </button>

            <button 
              onClick={() => handleScrollKegiatan("right")} 
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-[60] w-12 h-12 rounded-full bg-[#1a365d] text-white flex items-center justify-center shadow-2xl hover:bg-blue-600 transition-all active:scale-90"
            >
              <ChevronRight size={24}/>
            </button>

            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-10 no-scrollbar px-2" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {kegiatanList.map((item, index) => (
                <div key={index} className="min-w-[100%] sm:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] snap-start">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 group transition-all duration-500 hover:shadow-2xl flex flex-col h-full">
                    <div className="relative h-60 overflow-hidden border-b border-gray-50">
                      <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-110 transition duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-8 flex flex-col flex-grow text-center items-center justify-center">
                      <h3 className="font-black text-[#1a365d] uppercase tracking-widest text-[11px] mb-3 group-hover:text-blue-600 transition-colors leading-tight">{item.title}</h3>
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.1em] leading-relaxed italic text-center">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROSEDUR PENDAFTARAN */}
      <section id="prosedur" className="py-32 relative bg-[#f8fafc] px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-24 text-center md:text-left">
            <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px] mb-2 block text-left">Registration Path</span>
            <h3 className="text-4xl md:text-5xl font-black text-[#1a365d] uppercase tracking-tighter leading-tight text-left">Prosedur <span className="text-blue-500">Pendaftaran</span></h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12 relative before:absolute before:left-[31px] before:top-8 before:bottom-8 before:w-[2px] before:bg-blue-100 text-left">
              <NewStepItem num="01" title="Pengambilan Formulir" desc="Biaya pendaftaran sebesar Rp 250.000 dilakukan saat awal registrasi." />
              <NewStepItem num="02" title="Mengisi Formulir & Syarat" desc="Lengkapi data diri calon santri pada portal pendaftaran kami." />
              <NewStepItem num="03" title="Observasi Calon Siswa" desc="Pertemuan pengenalan antara guru dan calon santri." />
              <NewStepItem num="04" title="Membayar Biaya Masuk" desc="Pelunasan biaya masuk sekolah sesuai jenjang yang dipilih." />
              <NewStepItem num="05" title="Konfirmasi Akhir" desc="Verifikasi data dan persiapan memasuki hari pertama sekolah." />
            </div>
            <div className="lg:text-right flex flex-col lg:items-end p-12 bg-white rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100">
              <h2 className="text-5xl md:text-6xl font-black text-[#1a365d] uppercase tracking-tighter mb-8 leading-[0.85] text-right">Bergabung <br/> <span className="text-blue-500">Menjadi Bagian</span> <br/> Dari Kami</h2>
              <p className="text-gray-400 text-lg font-medium max-w-sm leading-relaxed mb-10 text-right">Wujudkan masa depan gemilang Ananda bersama lingkungan pendidikan Islami yang modern dan terpercaya.</p>
              <Link href="/pendaftaran" className="inline-flex items-center gap-4 bg-[#1a365d] text-white px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all group shadow-xl active:scale-95 text-center"> Daftar Online <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" /> </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-[#1a365d] text-white pt-32 pb-12 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
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
              <Link href="https://instagram.com/tkislambaiturrahman_" target="_blank" className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 px-5 py-3 rounded-2xl transition-all group border border-white/5">
                <img src="https://cdn.simpleicons.org/instagram/E4405F" alt="IG" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/70 italic text-left">@tkislambaiturrahman_</span>
              </Link>
            </div>

            <div className="space-y-8 text-left">
              <h4 className="font-black uppercase tracking-[0.2em] text-[11px] text-blue-400 border-l-2 border-blue-400 pl-4 text-left font-sans">Navigasi</h4>
              <ul className="space-y-5 font-bold text-white/50 uppercase text-[11px] tracking-[0.2em] text-left">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/tentang" className="hover:text-white transition-colors">Tentang Kami</Link></li>
                <li><Link href="/akademik/biaya" className="hover:text-white transition-colors">Biaya Pendidikan</Link></li>
                <li><Link href="/pendaftaran" className="hover:text-white transition-colors">Pendaftaran</Link></li>
              </ul>
            </div>

            <div className="space-y-8 text-left text-white/70">
              <h4 className="font-black uppercase tracking-[0.2em] text-[11px] text-blue-400 border-l-2 border-blue-400 pl-4 text-left">Kontak Kami</h4>
              <ul className="space-y-6 text-[11px] font-bold">
                <li className="flex items-start gap-5 leading-relaxed group text-left">
                  <MapPin size={22} className="text-blue-400 shrink-0" />
                  <span className="uppercase tracking-widest text-left">Jl. Komp. Villa Bintaro Indah <br /> Blok A VII, Jombang, <br /> Ciputat, Tangsel.</span>
                </li>
                <li className="flex items-center gap-5 group text-left">
                  <Mail size={20} className="text-blue-400 shrink-0" />
                  <span className="tracking-widest lowercase text-left">admin@tkbaiturrahman.sch.id</span>
                </li>
              </ul>
            </div>

            <div className="space-y-8 lg:text-right flex flex-col lg:items-end text-right">
              <h4 className="font-black uppercase tracking-[0.2em] text-[11px] text-blue-400 border-r-2 border-blue-400 pr-4 hidden lg:block text-right">Mari Bergabung</h4>
              <p className="text-white/40 text-[11px] font-medium uppercase tracking-[0.2em] leading-relaxed lg:text-right">Pendaftaran 2026/2027 tersedia. Amankan kursi untuk Ananda.</p>
              <Link href="/pendaftaran" className="inline-flex items-center gap-3 bg-blue-600 hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-2xl"> Daftar Sekarang <ArrowRight size={16} /> </Link>
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] text-white/10">
            <span>© 2026 TK Baiturrahman</span>
            <span>Designed by Naufal</span>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <Link href="https://wa.me/6281297332355" target="_blank" className="fixed bottom-8 right-8 z-[1100] group flex items-center gap-4">
        <span className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-2xl text-[11px] font-black uppercase tracking-widest text-[#1a365d] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-6 group-hover:translate-x-0 border border-white">Tanya Kami</span>
        <div className="w-16 h-16 bg-[#25D366] text-white rounded-[2rem] shadow-[0_15px_40px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 border-4 border-white relative overflow-hidden">
          <img src="https://cdn.simpleicons.org/whatsapp/white" alt="WA" className="w-8 h-8" />
          <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none rounded-full" />
        </div>
      </Link>
    </div>
  );
}

// Subcomponents Helper
function DropdownLink({ href, title }: { href: string, title: string }) {
  return (
    <Link href={href} className="block px-8 py-4 text-[#1a365d] text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all border-b border-gray-50 last:border-0"> {title} </Link>
  );
}

function LargeIconCard({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  return (
    <div className="relative p-12 bg-white rounded-[3rem] border border-transparent shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 transition-all duration-500 group text-center flex flex-col h-full items-center justify-center">
      <div className="text-6xl mb-8 transform group-hover:scale-110 transition-transform duration-500 shrink-0 text-center"> {icon} </div>
      <div className="flex-grow text-center items-center justify-center">
        <h4 className="text-lg font-black text-[#1a365d] uppercase tracking-tighter mb-5 leading-tight group-hover:text-blue-600 transition-colors text-center"> {title} </h4>
        <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-[250px] mx-auto group-hover:text-gray-700 transition-colors text-center"> {desc} </p>
      </div>
    </div>
  );
}

function NewStepItem({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex gap-10 relative group text-left">
      <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-50 flex items-center justify-center text-xl font-black text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 transform group-hover:rotate-[360deg]"> {num} </div>
      <div className="pt-2 text-left">
        <h4 className="text-xl font-black text-[#1a365d] uppercase tracking-tighter mb-3 group-hover:text-blue-600 transition-colors text-left leading-tight"> {title} </h4>
        <p className="text-gray-400 text-[13px] font-medium leading-relaxed max-w-sm italic text-left"> {desc} </p>
      </div>
    </div>
  );
}