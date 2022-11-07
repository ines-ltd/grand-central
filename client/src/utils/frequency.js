export default function frequency (arr, key) {

  const m = new Map()

  for (let obj of arr) {
    const val = obj[key]
    const count = m.get(val) ?? 0
    m.set(val, count + 1)
  }

  return m

}
