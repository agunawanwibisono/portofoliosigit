import { useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { profile } from '../data/portfolio'
import photo from '../assets/profile.jpg'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="navbar">
      <a className="wordmark" href="#home" aria-label={`${profile.name} — Home`}>
        <img className="wordmark-photo" src={photo} alt="" width={36} height={36} />
        <span className="wordmark-name">Sigit Indra Kurniawan <span> / portfolio</span></span>
      </a>
      <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
        {links.map(link => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
        ))}
        <a className="nav-cta" href={profile.whatsappUrl} target="_blank" rel="noreferrer">
          WhatsApp <MessageCircle size={14} />
        </a>
      </nav>
      <button className="mobile-toggle" onClick={() => setOpen(v => !v)} aria-label={open ? 'Tutup menu' : 'Buka menu'} aria-expanded={open}>
        {open ? <X /> : <Menu />}
      </button>
    </header>
  )
}
