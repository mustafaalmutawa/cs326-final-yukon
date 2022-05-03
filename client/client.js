import * as crud from './crud.js';

const register_button = document.getElementById("register_button");
const login_button = document.getElementById('login_button');
const email_field = document.getElementById('login_email');
const password_field = document.getElementById('login_password');
const listing_button = document.getElementById("create_listing");
const delete_button = document.getElementById("delete_button")
const updateName_button = document.getElementById('update_name');
const updateListing_button = document.getElementById('update_listing');
const userProducts_num = document.getElementsByClassName('product').length;
let productToUpdate = 0;

if (register_button !== null) {
  register_button.addEventListener('click', async (e) => {
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    await crud.register(username,email, password);
    window.location.href = "user_profile.html";
  });
}

if (delete_button !== null) {
  delete_button.addEventListener('click', async(e) => {
  await crud.deleteUser();
  window.location.href = "register.html";
})
}

if (listing_button !== null) {
  listing_button.addEventListener('click', async (e) => {
    const itemName = document.getElementById("itemName").value;
    const price = document.getElementById("price").value;

    const selectedCategory = document.getElementById("category");
    const category = selectedCategory.options[selectedCategory.selectedIndex].text;

    const selectedCondition = document.getElementById("condition");
    const condition = selectedCondition.options[selectedCondition.selectedIndex].text;

    const description = document.getElementById("description").value;
    const images = document.getElementById("images").files;

    const selectedLocation = document.getElementById("location");
    const location = selectedLocation.options[selectedLocation.selectedIndex].text;

    const shipping = document.getElementById("shipping").checked;
    let shippingPrice = null;
    if (shipping) {
      shippingPrice = document.getElementById("shipping_price").value;
    }

    const pickup = document.getElementById("pickup").checked;
    const selectedPayment = document.getElementById("pPayement").selectedOptions
    const payment = Array.from(selectedPayment).map(o => o.value);

    const product_data = await crud.createProduct(itemName, price, category, condition, description, images, location, shipping, shippingPrice, pickup, payment);
    window.location.href = "user_profile.html";
  });
}

if (updateName_button !== null) {
  updateName_button.addEventListener('click', async (e) => {
    const name = document.getElementById('newName').value;
    document.getElementById('user_name').innerHTML = name;
    await crud.updateName(name);
  });
}

for (let i = 1; i <= userProducts_num; i++) {
  const updateProduct_button = document.getElementById(`updateProduct${i}`);
  if (updateProduct_button !== null) {
    updateProduct_button.addEventListener('click', async (e) => {
      productToUpdate = i;
      window.location.href = "update_listing.html";
    });
  }
}

if (updateListing_button !== null) {
  updateListing_button.addEventListener('click', async (e) => {
    const itemName = document.getElementById("itemName").value;
    const price = document.getElementById("price").value;

    const selectedCategory = document.getElementById("category");
    const category = selectedCategory.options[selectedCategory.selectedIndex].text;

    const selectedCondition = document.getElementById("condition");
    const condition = selectedCondition.options[selectedCondition.selectedIndex].text;

    const description = document.getElementById("description").value;
    const images = document.getElementById("images").files;

    const selectedLocation = document.getElementById("location");
    const location = selectedLocation.options[selectedLocation.selectedIndex].text;

    const shipping = document.getElementById("shipping").checked;
    let shippingPrice = null;
    if (shipping) {
      shippingPrice = document.getElementById("shipping_price").value;
    }
    const pickup = document.getElementById("pickup").checked;

    const selectedPayment = document.getElementById("pPayement").selectedOptions
    const payment = Array.from(selectedPayment).map(o => o.value);
    await crud.updateProduct(productToUpdate, itemName, price, category, condition, description, images, location, shipping, shippingPrice, pickup, payment)
  });
}