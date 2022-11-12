export default function pick (obj, ...keep) {
  const result = {}

  for (const key in obj) {
    if (keep.includes(key)) result[key] = obj[key]
  }

  return result
}
