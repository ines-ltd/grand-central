export default function pick (obj, ...keep) {

  const result = {}

  for (let key in obj) {
    if (keep.includes(key)) result[key] = obj[key]
  }

  return result

}
