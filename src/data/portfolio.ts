import type { LucideIcon } from 'lucide-react'
import { Anchor, ClipboardList, Users } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Profil & kontak                                                    */
/* ------------------------------------------------------------------ */
const WHATSAPP_NUMBER = '6285213010493' // format internasional tanpa "+" / "0"

export const profile = {
  name: 'Sigit Indra Kurniawan',
  initials: 'SK',
  headline: 'Lulusan D3 Manajemen Transportasi Laut',
  role: 'Customer Service, Shipping, & Logistics Professional',
  location: 'Kalitengah, Lamongan, Jawa Timur',
  summary:
    'Lulusan D3 Manajemen Transportasi Laut dari Sekolah Tinggi Maritim Yogyakarta dengan pengalaman di bidang customer service operasional, shipping, dan logistik. Terbiasa menangani proses ekspor-impor, pengurusan dokumen kepabeanan, koordinasi dengan berbagai pihak terkait, serta memberikan layanan pelanggan yang responsif dan profesional. Memiliki kemampuan komunikasi yang baik, teliti dalam administrasi, dan mampu bekerja secara mandiri maupun dalam tim di lingkungan kerja yang dinamis.',
  education: 'D3 Manajemen Transportasi Laut',
  university: 'Sekolah Tinggi Maritim Yogyakarta (STIMARYO)',
  email: 'sigitindrakurniawan17@gmail.com',
  phoneDisplay: '0852-1301-0493',
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}`,
}

/** Link WhatsApp dengan pesan terisi otomatis. */
export const buildWhatsAppUrl = (message: string) =>
  `${profile.whatsappUrl}?text=${encodeURIComponent(message)}`

/** Link mailto dengan subjek & isi terisi otomatis (fallback form email). */
export const buildMailtoUrl = (subject: string, body: string) =>
  `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

/* ------------------------------------------------------------------ */
/*  Pengalaman kerja (terbaru → terlama)                               */
/* ------------------------------------------------------------------ */
export type WorkExperience = {
  company: string
  location: string
  position: string
  period: string
  /** Hanya diisi bila bukan pekerjaan reguler. */
  type?: 'Freelance' | 'Internship'
  highlights: string[]
  tags: string[]
}

export const experiences: WorkExperience[] = [
  {
    company: 'PT Putra Batam Jasa Mandiri Utama',
    location: 'Batam, Kepulauan Riau',
    position: 'Admin Trucking',
    period: 'Jun 2026 – Sep 2026',
    highlights: [
      'Input data pergerakan armada & kontainer ke sistem TMS/ERP dengan target zero input error.',
      'Mengelola dokumen operasional (Surat Jalan / Timesheet).',
      'Menyusun laporan BSW harian dan rekap bulanan untuk kebutuhan Billing.',
      'Koordinasi pengiriman dokumen fisik ke Pool A serta verifikasi & validasi data lapangan.',
    ],
    tags: ['TMS / ERP', 'Data Entry', 'Billing Report'],
  },
  {
    company: 'PT Octogon Logistik Indonesia (INFINITI MARINE PTE LTD)',
    location: 'Batam, Kepulauan Riau',
    position: 'Customer Service Trucking (Traffic Controller)',
    period: 'Agu 2025 – Mei 2026',
    highlights: [
      'Mengoordinasikan jadwal pengiriman darat dan kesiapan armada.',
      'Menjadi penghubung utama antara pelanggan, tim internal, dan vendor.',
      'Memantau pergerakan armada secara real-time (ETA & SOP keselamatan).',
      'Memastikan kelengkapan dokumen (surat jalan / POD), menangani keluhan, serta mendukung evaluasi vendor.',
    ],
    tags: ['Traffic Control', 'ETA Monitoring', 'Vendor Management'],
  },
  {
    company: 'PT Infiniti Marine (INFINITI MARINE PTE LTD)',
    location: 'Batam, Kepulauan Riau',
    position: 'Customer Service Operation',
    period: 'Mar 2025 – Agu 2025',
    highlights: [
      'Mengoordinasikan pengiriman impor bernilai tinggi (kedatangan kapal & cargo release).',
      'Tracking shipment (mother / feeder vessel).',
      'Mengelola dokumen kepabeanan (Invoice, Packing List, Bill of Lading, Manifest) dan BSIMS BP Batam.',
      'Berkoordinasi lintas sektoral (bea cukai, PPJK, agent, trucking, warehouse) serta membuat PO dan laporan status.',
    ],
    tags: ['Import', 'Customs Documents', 'BSIMS'],
  },
  {
    company: 'PT Mutiara Haluan Samudra & PT Infiru Marine Indonesia',
    location: 'Batam, Kepulauan Riau',
    position: 'Admin Shipping',
    period: 'Des 2024 – Feb 2025',
    type: 'Freelance',
    highlights: [
      'Mengelola administrasi dan arsip dokumen operasional.',
      'Verifikasi data kapal dan awak kapal.',
      'Mendukung clearance kapal bersama pihak pelabuhan dan agen.',
      'Menjaga komunikasi aktif lintas tim demi kelancaran operasional.',
    ],
    tags: ['Shipping Admin', 'Ship Clearance', 'Documentation'],
  },
  {
    company: 'PT Samudra Pacific Indonesia Lines',
    location: 'Jakarta, Indonesia',
    position: 'Praktek Kerja Lapangan (PKL)',
    period: 'Feb 2024 – Jun 2024',
    type: 'Internship',
    highlights: [
      'Membantu pengurusan izin olah gerak kapal.',
      'Clearance in/out sesuai peraturan maritim.',
      'Input dan pengecekan data dokumen kapal.',
      'Berkoordinasi dengan staf operasional pelabuhan.',
    ],
    tags: ['Internship', 'Port Operations', 'Maritime Regulation'],
  },
]

/* ------------------------------------------------------------------ */
/*  Pendidikan                                                         */
/* ------------------------------------------------------------------ */
export type Education = {
  school: string
  location: string
  program: string
  period: string
  tag: string
}

export const education: Education[] = [
  {
    school: 'Sekolah Tinggi Maritim Yogyakarta (STIMARYO)',
    location: 'Kota Yogyakarta, DIY',
    program: 'Diploma in Manajemen Transportasi Laut',
    period: 'Okt 2021 – Okt 2024',
    tag: 'Diploma',
  },
  {
    school: 'SMK Sunan Drajat',
    location: 'Lamongan, Jawa Timur',
    program: 'Nautika Kapal Penangkap Ikan',
    period: 'Feb 2017 – Jul 2020',
    tag: 'Vocational High School',
  },
]

/* ------------------------------------------------------------------ */
/*  Keahlian & sertifikasi                                             */
/* ------------------------------------------------------------------ */
export type SkillGroup = { title: string; description: string; icon: LucideIcon; items: string[] }

export const skillGroups: SkillGroup[] = [
  {
    title: 'Sistem Kepelabuhanan & Maritim',
    description: 'Sistem dan prosedur pelabuhan',
    icon: Anchor,
    items: ['Inaportnet', 'BSIMS (Batam Single Integrated Management System)', 'IONB & Kanim', 'Sistem Clearance In/Out Kapal'],
  },
  {
    title: 'Administrasi & Logistik',
    description: 'Dokumen, data, dan pelaporan operasional',
    icon: ClipboardList,
    items: [
      'Manajemen Dokumen Ekspor-Impor',
      'Shipment Tracking & ETA Monitoring',
      'Data Entry & Validasi',
      'ERP',
      'TMS',
      'Pembuatan Laporan Operasional',
    ],
  },
  {
    title: 'Soft Skills',
    description: 'Cara bekerja dan berkomunikasi',
    icon: Users,
    items: [
      'Komunikasi Profesional',
      'Pelayanan Pelanggan (Customer Oriented)',
      'Manajemen Waktu',
      'Problem Solving',
      'Leadership',
      'Kerja Sama Tim',
      'Teliti & Rapi',
      'Mampu Bekerja di Bawah Tekanan',
    ],
  },
]

export type Certification = { title: string; issuer: string; detail: string }

export const certifications: Certification[] = [
  { title: 'Freight Forwarding', issuer: 'BNSP', detail: 'Sertifikasi kompetensi' },
  { title: 'TOEIC', issuer: 'Kemampuan bahasa Inggris', detail: 'Skor 600' },
]
