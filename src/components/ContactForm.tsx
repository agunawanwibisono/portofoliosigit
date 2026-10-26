import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { buildMailtoUrl, buildWhatsAppUrl, profile } from '../data/portfolio'

type Fields = { name: string; email: string; subject: string; message: string }
type FieldErrors = Partial<Record<keyof Fields, string>>
type Status =
  | { state: 'idle' }
  | { state: 'sending' }
  | { state: 'success'; text: string }
  | { state: 'partial'; text: string; fallbackHref?: string }
  | { state: 'error'; text: string; fallbackHref?: string }

const EMPTY: Fields = { name: '', email: '', subject: '', message: '' }
const LIMITS = { name: 80, email: 120, subject: 120, message: 1500 }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const emailjs = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}
const emailjsReady = Boolean(emailjs.serviceId && emailjs.templateId && emailjs.publicKey)

/** Email pengirim wajib karena pesan dikirim juga ke email (agar bisa dibalas). */
function validate(values: Fields): FieldErrors {
  const errors: FieldErrors = {}
  const v = { name: values.name.trim(), email: values.email.trim(), subject: values.subject.trim(), message: values.message.trim() }
  if (v.name.length < 2) errors.name = 'Nama minimal 2 karakter.'
  if (!v.email) errors.email = 'Email wajib diisi agar saya bisa membalas.'
  else if (v.email && !EMAIL_PATTERN.test(v.email)) errors.email = 'Format email belum valid.'
  if (v.subject.length < 3) errors.subject = 'Subjek minimal 3 karakter.'
  if (v.message.length < 10) errors.message = 'Pesan minimal 10 karakter.'
  return errors
}

function composeWhatsAppMessage(v: Fields) {
  const lines = [`Halo Sigit, saya ${v.name.trim()}.`, '', `Subjek: ${v.subject.trim()}`, `Pesan: ${v.message.trim()}`]
  if (v.email.trim()) lines.push('', `Email saya: ${v.email.trim()}`)
  return lines.join('\n')
}

function composeMailBody(v: Fields) {
  return `Halo Sigit,\n\n${v.message.trim()}\n\nSalam,\n${v.name.trim()}${v.email.trim() ? `\n${v.email.trim()}` : ''}`
}

export default function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>({ state: 'idle' })
  const honeypot = useRef<HTMLInputElement>(null)
  const sending = status.state === 'sending'

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.name as keyof Fields
    setValues(prev => ({ ...prev, [key]: e.target.value }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }))
    if (status.state !== 'idle' && status.state !== 'sending') setStatus({ state: 'idle' })
  }

  const check = () => {
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setStatus({ state: 'error', text: 'Mohon lengkapi kolom yang ditandai terlebih dahulu.' })
      return false
    }
    return true
  }

  /* ----- Satu tombol: buka WhatsApp + kirim Email (EmailJS) ----- */
  const openWhatsApp = () => {
    // Anchor programatik: aman dari popup blocker (dipanggil sinkron dari klik pengguna) dan tetap noopener.
    const link = document.createElement('a')
    link.href = buildWhatsAppUrl(composeWhatsAppMessage(values))
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const sendEmail = async () => {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        service_id: emailjs.serviceId,
        template_id: emailjs.templateId,
        user_id: emailjs.publicKey,
        template_params: {
          to_email: profile.email,
          from_name: values.name.trim(),
          from_email: values.email.trim(),
          reply_to: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        },
      }),
    })
    if (!res.ok) throw new Error(`EmailJS ${res.status}`)
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (sending) return
    if (honeypot.current?.value) return // bot terdeteksi: abaikan diam-diam
    if (!check()) return

    const mailto = buildMailtoUrl(values.subject.trim(), composeMailBody(values))

    // WhatsApp dibuka lebih dulu & sinkron, supaya tidak diblokir browser setelah proses async email.
    openWhatsApp()

    if (!emailjsReady) {
      setStatus({
        state: 'partial',
        text: 'WhatsApp sudah dibuka. Untuk mengirim juga lewat email, klik tautan di bawah.',
        fallbackHref: mailto,
      })
      return
    }

    setStatus({ state: 'sending' })
    try {
      await sendEmail()
      setValues(EMPTY)
      setErrors({})
      setStatus({ state: 'success', text: 'Pesan terkirim ke email dan WhatsApp telah dibuka. Tekan kirim di WhatsApp untuk menyelesaikan. Terima kasih!' })
    } catch {
      setStatus({
        state: 'partial',
        text: 'WhatsApp sudah dibuka, tetapi pesan ke email gagal terkirim. Coba kirim lagi atau gunakan aplikasi email.',
        fallbackHref: mailto,
      })
    }
  }

  const field = (key: keyof Fields, label: string, props: { type?: string; placeholder: string; autoComplete?: string }, optional = false) => (
    <div className={errors[key] ? 'form-field has-error' : 'form-field'}>
      <label htmlFor={`cf-${key}`}>
        {label}
        {optional && <i>opsional untuk WhatsApp</i>}
      </label>
      <input
        id={`cf-${key}`}
        name={key}
        type={props.type ?? 'text'}
        value={values[key]}
        onChange={onChange}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        maxLength={LIMITS[key]}
        disabled={sending}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `cf-${key}-error` : undefined}
      />
      {errors[key] && <span className="field-error" id={`cf-${key}-error`}>{errors[key]}</span>}
    </div>
  )

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate aria-label="Form kontak">
      <div className="form-title">
        <span className="eyebrow">SEND A MESSAGE</span>
        <p>Satu kali kirim: pesan masuk ke email dan WhatsApp terbuka dengan pesan yang sudah terisi.</p>
      </div>

      <div className="form-row">
        {field('name', 'Nama', { placeholder: 'Nama lengkap Anda', autoComplete: 'name' })}
        {field('email', 'Email', { type: 'email', placeholder: 'nama@email.com', autoComplete: 'email' })}
      </div>
      {field('subject', 'Subjek', { placeholder: 'Misalnya: Peluang kerja di bidang logistik' })}

      <div className={errors.message ? 'form-field has-error' : 'form-field'}>
        <label htmlFor="cf-message">Pesan</label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={onChange}
          placeholder="Tulis pesan Anda di sini…"
          maxLength={LIMITS.message}
          disabled={sending}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
        />
        <div className="field-foot">
          {errors.message ? <span className="field-error" id="cf-message-error">{errors.message}</span> : <span />}
          <small>{values.message.length}/{LIMITS.message}</small>
        </div>
      </div>

      {/* Honeypot anti-spam: tersembunyi dari pengguna, terisi oleh bot */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" ref={honeypot} />
      </div>

      <div className="form-actions">
        <button type="submit" className="button button-primary" disabled={sending}>
          {sending ? <><Loader2 size={15} className="spin" /> Mengirim…</> : <><Send size={15} /> Kirim Pesan</>}
        </button>
      </div>

      <div className="form-status" role="status" aria-live="polite">
        {status.state === 'success' && (
          <p className="status-banner is-success"><CheckCircle2 size={16} /><span>{status.text}</span></p>
        )}
        {(status.state === 'error' || status.state === 'partial') && (
          <p className={status.state === 'partial' ? 'status-banner is-warn' : 'status-banner is-error'}>
            <AlertCircle size={16} />
            <span>
              {status.text}
              {status.fallbackHref && <> <a href={status.fallbackHref}>Buka aplikasi email →</a></>}
            </span>
          </p>
        )}
      </div>
    </form>
  )
}
