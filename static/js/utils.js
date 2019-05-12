/**
 * Created by Joe on 4/26/2019.
 */

function isNumeric(s) {
  for (var i=0; i< s.length; i++) {
    if (s[i] < '0' || s[i] > '9')
      return false;
  }
  return true;
}

function isValidEffort(value) {
  if (!isNumeric(value)) return false;
  var x = parseInt(value);
    return x >= 0 && x <= 100;
}
