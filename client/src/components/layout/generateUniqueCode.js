//generate 6 digit unique code

function generateUniqueCode() {
  const unique_code = Math.floor(100000 + Math.random() * 900000).toString();
  return unique_code;
}
export default generateUniqueCode;
