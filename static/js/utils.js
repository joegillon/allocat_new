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

function dateSwitch(date) {
  return data.slice(3) + data.slice(0, 2);
}

function addToList(ctl, values, sortFld) {
  $$(ctl).add(values);
  $$(ctl).sort(sortFld, "asc");
  $$(ctl).showItem(values.id);
  $$(ctl).select(values.id);
}