export async function login(username, password) {
  const user = {'username': username, 'password': password};
  const response = await fetch(`/user/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    }
  );
  const data = await response.json();
  return data;
}
export async function register(username,email, password) {
  const user = {'username': username, "email": email, 'password': password};
  const response = await fetch(`/user/new`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    }
  );
  const data = await response.json();
  return data;
}

export async function postproduct(itemName,price,category,condition,description,images,location,shipping,pickup,payment) {
  const user = {"itemName": itemName, "price": price, "category": category, "condition": condition, "description": description, "images": images, "location": location, "shipping": shipping, "pickup": pickup, "payment": payment}

  const response = await fetch(`/product/new`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    }
  );
  const data = await response.json();
  return data;
}
export async function getUserProfile() {
  try {
    const response = await fetch(`/login`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}