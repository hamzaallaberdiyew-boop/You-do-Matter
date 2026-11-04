export const topics = [
  'Loneliness',
  'Study',
  'Family',
  'Friends',
  'Relationships',
  'Work',
  'Grief',
  'Other',
]

export function groupOf(topic) {
  if (topics.includes(topic)) {
    return topic
  }
  return 'Other'
}