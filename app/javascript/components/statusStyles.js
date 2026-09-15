// Un color de identidad por status, reutilizado por Column y Card
// para que la columna y sus cards se lean como un mismo grupo.
export const STATUS_STYLES = {
  interested: {
    label: 'Interested',
    column: 'border-t-slate-400 bg-slate-50',
    badge: 'bg-slate-200 text-slate-700',
    card: 'border-l-slate-400',
    dot: 'bg-slate-400',
  },
  applied: {
    label: 'Applied',
    column: 'border-t-blue-400 bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
    card: 'border-l-blue-400',
    dot: 'bg-blue-400',
  },
  interviewing: {
    label: 'Interviewing',
    column: 'border-t-amber-400 bg-amber-50',
    badge: 'bg-amber-100 text-amber-700',
    card: 'border-l-amber-400',
    dot: 'bg-amber-400',
  },
  offer: {
    label: 'Offer',
    column: 'border-t-teal-400 bg-teal-50',
    badge: 'bg-teal-100 text-teal-700',
    card: 'border-l-teal-400',
    dot: 'bg-teal-400',
  },
  hired: {
    label: 'Hired',
    column: 'border-t-green-500 bg-green-50',
    badge: 'bg-green-100 text-green-700',
    card: 'border-l-green-500',
    dot: 'bg-green-500',
  },
  rejected: {
    label: 'Rejected',
    column: 'border-t-rose-400 bg-rose-50',
    badge: 'bg-rose-100 text-rose-700',
    card: 'border-l-rose-400',
    dot: 'bg-rose-400',
  },
}
