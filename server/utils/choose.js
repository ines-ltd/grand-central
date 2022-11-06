function choose (arr, count = 1) {
  
  if (count === 1) {
    const i = Math.floor(Math.random() * arr.length)
    return arr[i]
  }

  arr = [...arr]

  count = Math.min(count, arr.length)
  const result = []

  for (let j = 0; j < count; j++) {
    const i = Math.floor(Math.random() * arr.length)
    const el = arr.splice(i, 1)[0]
    result.push(el)
  }

  return result

}

module.exports = choose
