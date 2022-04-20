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
export async function deleteUser(username) {
  const response = await fetch(`//user/delete`, {
    method: 'DELETE',
    body: JSON.stringify({ "id": username }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
  }

export async function createProduct(itemName,price,category,condition,description,images,location,shipping,shippingPrice,pickup,payment) {
  const details = {"itemName": itemName, "price": price, "category": category, 
  "condition": condition, "description": description, "images": images,
  "location": location, "shipping": shipping, "shippingPrice": shippingPrice,
  "pickup": pickup, "payment": payment}

  const response = await fetch(`/product/new`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
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
export async function getProduct() {
  try {
    const response = await fetch(`/product`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}