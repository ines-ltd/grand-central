export default function frequency (arr, key) {

  console.log(arr)

  const m = new Map()

  for (let obj of arr) {
    const val = obj[key]
    const count = m.get(val) ?? 0
    m.set(val, count + 1)
  }

  return sortMap(m)

}

function sortMap (m) {
  const keys = [...m.keys()].sort()
  const mSorted = new Map()
  for (let key of keys) {
    mSorted.set(key, m.get(key))
  }
  return mSorted
}