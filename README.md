# Sigit Indra Kurniawan — Dark Premium Portfolio

Portofolio profesional (Customer Service, Shipping & Logistics) berbasis React, Vite, TypeScript, Framer Motion, dan Lucide React. Satu halaman, responsif, tema gelap premium.

## Menjalankan lokal
Butuh Node.js 20.19+ atau 22.12+.
```bash
npm install
cp .env.example .env   # lalu isi kredensial EmailJS (lihat di bawah)
npm run dev
```
Build produksi: `npm run build` → hasil di `dist/`.

## Mengubah konten
Semua data ada di `src/data/portfolio.ts`:
- `profile` — nama, ringkasan, email, nomor WhatsApp (`whatsappNumber`, format `62…`).
- `experiences` — pengalaman kerja (terbaru → terlama).
- `education` — riwayat pendidikan.
- `skillGroups` & `certifications` — keahlian dan sertifikasi.

## Form kontak (Email & WhatsApp)
**Satu tombol "Kirim Pesan"** menjalankan dua hal sekaligus: membuka WhatsApp dan mengirim email. Bagian WhatsApp tanpa konfigurasi. Data Nama, Subjek, Pesan (dan Email bila diisi) diformat lalu membuka `https://wa.me/6285213010493?text=…` di tab baru.

Bagian email memakai [EmailJS](https://www.emailjs.com) lewat REST API (tanpa dependensi tambahan).
1. Buat akun EmailJS → **Email Services** → hubungkan Gmail `sigitindrakurniawan17@gmail.com`.
2. **Email Templates** → buat template, misalnya:
   - **To Email:** `{{to_email}}` (atau langsung `sigitindrakurniawan17@gmail.com`)
   - **Reply-To:** `{{reply_to}}`
   - **Subject:** `[Portfolio] {{subject}}`
   - **Content:** `Dari: {{from_name}} ({{from_email}})` + `{{message}}`
3. Salin **Service ID**, **Template ID**, dan **Public Key** ke `.env`:
   ```
   VITE_EMAILJS_SERVICE_ID=...
   VITE_EMAILJS_TEMPLATE_ID=...
   VITE_EMAILJS_PUBLIC_KEY=...
   ```
4. Di dashboard EmailJS (**Security**), batasi *allowed domains* ke domain portfolio Anda agar Public Key tidak disalahgunakan.
5. Saat deploy di Vercel, isi tiga variabel yang sama di **Project Settings → Environment Variables**.

Bila variabel belum diisi, tombol email menampilkan pemberitahuan dan tautan fallback `mailto:` — tidak ada pesan yang hilang diam-diam.

## Deploy ke Vercel
Framework preset **Vite**, build command `npm run build`, output directory `dist`. Tambahkan environment variables EmailJS di atas.
