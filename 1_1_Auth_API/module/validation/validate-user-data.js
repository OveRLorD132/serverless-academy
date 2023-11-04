module.exports = {
  validateEmail,
  validatePassword
}

function validateEmail(email) {
  if(email.length > 100) return false;
  return true;
}

function validatePassword(password) {
  if(password.length > 40) return false;
  return true;
}