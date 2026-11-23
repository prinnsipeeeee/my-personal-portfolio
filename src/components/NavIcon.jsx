import {
  Home,
  User,
  Layers,
  Briefcase,
  Clock,
  GitBranch,
  Mail,
} from 'lucide-react'

const ICON_MAP = {
  home: Home,
  user: User,
  layers: Layers,
  briefcase: Briefcase,
  clock: Clock,
  'git-branch': GitBranch,
  mail: Mail,
}

export default function NavIcon({ name, className = 'w-3.5 h-3.5' }) {
  const Icon = ICON_MAP[name] || Home
  return <Icon className={className} aria-hidden="true" />
}
