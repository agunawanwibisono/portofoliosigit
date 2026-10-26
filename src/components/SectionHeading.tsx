type Props = { eyebrow: string; title: string; description?: string; number?: string }
export default function SectionHeading({ eyebrow, title, description, number }: Props) {
  return <div className="section-heading"><div><span className="eyebrow">{number && <span className="section-number">{number}</span>}{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div><span className="heading-mark" aria-hidden="true">✳</span></div>
}
