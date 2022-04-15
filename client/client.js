import * as crud from './crud.js';

const login_button = document.getElementById('login_button');

login_button.addEventListener('click', async (e) => {
  const email = document.getElementById('login_email').value;
  const password = document.getElementById('login_password').value; 
  console.log(email)
  console.log(password)
  await crud.login(email, password);
});

