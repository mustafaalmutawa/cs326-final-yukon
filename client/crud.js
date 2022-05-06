
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
  return data.id;
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

export async function getProduct(id) {
    try {
      const response = await fetch(`/product?id=${id}`, {
        method: 'GET',
      });
      return response.url;
    } catch (err) {
      console.log(err);
    }
}

export async function getProductById(id) {
  try {
    const response = await fetch(`/product?id=${id}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getUpdateListingPage() {
  try {
    const response = await fetch(`/listing/update`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllProducts() {
    try {
      const response = await fetch(`/products`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
}

export async function getMostRecentProduct() {
    try {
      const response = await fetch(`/product/recent`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
}

export async function addHTMLToDB(productHTML, id, productURL) {
    try {
        const response = await fetch(`/product/html`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id, url: productURL, html: productHTML})
        });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
}

export async function loadListings() {
    try {
        const response = await fetch(`/product/all`, {
            method: 'GET'
        });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
}

export async function updateName(name) {
  try {
    const response = await fetch(`/user/update`, {
      method: 'PUT',
      body: JSON.stringify({name: name})
    });
  } catch (err) {
    console.log(err);
  }
}

export async function updateProduct(productToUpdate, itemName, price, category, condition, description, images, location, shipping, shippingPrice, pickup, payment) {
  const details = {produtId: productToUpdate, "itemName": itemName, "price": price, "category": category, 
  "condition": condition, "description": description, "images": images,
  "location": location, "shipping": shipping, "shippingPrice": shippingPrice,
  "pickup": pickup, "payment": payment}

  const response = await fetch(`/product/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details)
    }
  );
  const data = await response.json();
  return data;
}

export async function deleteUser() {
  const response = await fetch(`/user/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}
