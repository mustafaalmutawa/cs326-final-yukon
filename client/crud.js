export async function login(username, password) {
  const response = await fetch(
    '/user/login',
    {
      body: JSON.stringify({'username': username, 'password': password}),
      method: 'POST',
    }
  );
  const data = await response.json();
  return data;
}