import * as crud from './crud.js';

const login_button = document.getElementById('login_button');
const email_field = document.getElementById('login_email');
const password_field = document.getElementById('login_password');
email_field.addEventListener('input', function(){
  email_field.value = document.getElementById("login_email").value
  console.log(email_field.value);
});
password_field.addEventListener('input', function(){
  password_field.value = document.getElementById("login_password").value
  console.log(password_field.value);
});
login_button.addEventListener('click', async (e) => {
  const email = email_field.value;
  const password = password_field.value;
  console.log(email)
  console.log(password)
  await crud.login(email, password);
  await crud.getUserProfile();
});

