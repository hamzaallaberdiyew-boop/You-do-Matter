const phrases = [
  'kill myself',
  'suicide',
  'end my life',
  'want to die',
  "don't want to live",
  'better off dead',
  'hurt myself',
  'self harm',
  'self-harm',
  'no reason to live',
  'end it all',
]

export function needsCare(text) {
  const lower = text.toLowerCase()
  return phrases.some((p) => lower.includes(p))
}