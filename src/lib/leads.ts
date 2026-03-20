export interface LeadEntry {
  id: string
  name: string
  email: string
  company: string
  role: string
  interestLevel: string
  message: string
  submittedAt: string
}

const STORAGE_KEY = 'wxops_idp_leads'

export function getLeads(): LeadEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = JSON.parse(raw ?? '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveLead(lead: Omit<LeadEntry, 'id' | 'submittedAt'>): LeadEntry {
  const entry: LeadEntry = {
    ...lead,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    submittedAt: new Date().toISOString(),
  }
  const leads = getLeads()
  leads.push(entry)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
  return entry
}

export function clearLeads(): void {
  if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY)
}

export function downloadAsJSON(leads: LeadEntry[]): void {
  const blob = new Blob([JSON.stringify(leads, null, 2)], {
    type: 'application/json',
  })
  triggerDownload(blob, `wxops-leads-${isoDate()}.json`)
}

export function downloadAsCSV(leads: LeadEntry[]): void {
  const headers = [
    'ID',
    'Name',
    'Email',
    'Company',
    'Role',
    'Interest Level',
    'Message',
    'Submitted At',
  ]
  const rows = leads.map((l) => [
    l.id,
    l.name,
    l.email,
    l.company,
    l.role,
    l.interestLevel,
    escapeCSV(l.message),
    l.submittedAt,
  ])
  // UTF-8 BOM so Excel opens it correctly
  const csv =
    '\uFEFF' +
    [headers, ...rows]
      .map((row) => row.map((v) => `"${escapeCSV(String(v))}"`).join(','))
      .join('\r\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  triggerDownload(blob, `wxops-leads-${isoDate()}.csv`)
}

function escapeCSV(value: string): string {
  return value.replace(/"/g, '""').replace(/[\r\n]/g, ' ')
}

function isoDate(): string {
  return new Date().toISOString().slice(0, 10)
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
