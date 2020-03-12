function bin2hex(s) {
  // https://github.com/kvz/locutus/blob/master/src/php/strings/bin2hex.js
  var i
  var l
  var o = ''
  var n

  s += ''

  for (i = 0, l = s.length; i < l; i++) {
    n = s.charCodeAt(i)
      .toString(16)
    o += n.length < 2 ? '0' + n : n
  }

  return o
}

function hex2bin(s) {
  // https://github.com/kvz/locutus/blob/master/src/php/strings/hex2bin.js
  var ret = []
  var i = 0
  var l

  s += ''

  for (l = s.length; i < l; i += 2) {
    var c = parseInt(s.substr(i, 1), 16)
    var k = parseInt(s.substr(i + 1, 1), 16)
    if (isNaN(c) || isNaN(k)) return false
    ret.push((c << 4) | k)
  }

  return String.fromCharCode.apply(String, ret)
}

export default { bin2hex, hex2bin }
