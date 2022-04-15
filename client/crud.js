export async function login(username, password) {
  const user = {'username': username, 'password': password};
  const response = await fetch(
    '/user/login',
    {
      method: 'POST',
      body: JSON.stringify(user)
    }
  );
  const data = await response.json();
  return data;
}