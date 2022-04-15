import * as crud from './crud.js';

const login_button = document.getElementById('login_button');
const email_field = document.getElementById('login_email');
const password_field = document.getElementById('login_password');

login_button.addEventListener('click', async (e) => {
  const email = email_field.value;
  const password = password_field.value;
  await crud.login(email, password);
  await crud.getUserProfile();
});

