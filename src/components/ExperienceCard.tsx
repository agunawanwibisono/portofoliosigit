import { BriefcaseBusiness, MapPin } from 'lucide-react'
import type { WorkExperience } from '../data/portfolio'

export default function ExperienceCard({ item, index }: { item: WorkExperience; index: number }) {
  return (
    <div className="timeline-card">
      <div className="timeline-card-icon"><BriefcaseBusiness size={19} /></div>
      <div className="timeline-card-content">
        <span className="eyebrow">{item.type ? item.type.toUpperCase() : 'WORK EXPERIENCE'}</span>
        <h3>{item.position}</h3>
        <h4>{item.company}</h4>
        <div className="exp-meta">
          <span><MapPin size={11} /> {item.location}</span>
        </div>
        <ul>{item.highlights.map(h => <li key={h}>{h}</li>)}</ul>
        <div className="timeline-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      </div>
      <span className="timeline-count">{String(index + 1).padStart(2, '0')}</span>
    </div>
  )
}
