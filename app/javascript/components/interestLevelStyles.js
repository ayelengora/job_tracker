// Color por nivel de interés (low/medium/high), independiente del color de
// status. El punto y el texto usan esta paleta, no la de STATUS_STYLES —
// antes el punto tomaba el color del status, así que dos cards con distinto
// interest_level en la misma columna se veían iguales.
export const INTEREST_LEVEL_STYLES = {
  low: { dot: 'bg-neutral-400', text: 'text-neutral-500' },
  medium: { dot: 'bg-amber-500', text: 'text-amber-600' },
  high: { dot: 'bg-emerald-500', text: 'text-emerald-600' },
}
