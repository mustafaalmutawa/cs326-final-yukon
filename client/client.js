import * as crud from './crud.js';
const register_button = document.getElementById("register_button");
const login_button = document.getElementById('login_button');
const email_field = document.getElementById('login_email');
const password_field = document.getElementById('login_password');
if(login_button!== null){
login_button.addEventListener('click', async (e) => {
  const email = email_field.value;
  const password = password_field.value;
  await crud.login(email, password);
  await crud.getUserProfile();
});
}

if(register_button!== null){
register_button.addEventListener('click', async (e) => {
  const email = document.getElementById("email").value;
  console.log(email);
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  await crud.register(username,email, password);
  //await crud.getUserProfile(username,email,password);
});
}