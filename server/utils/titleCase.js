function titleCase (str) {
  return str
    .split(' ')
    .map((x) => x.charAt(0).toUpperCase() + x.substr(1))
    .join(' ')
}

module.exports = titleCase
