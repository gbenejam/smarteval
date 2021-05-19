export default function(dateString) {
  let result = null;
  if (dateString) {
    let date = new Date(dateString);
    result = date.toLocaleString('ca-ES');
  }
  return result;
}