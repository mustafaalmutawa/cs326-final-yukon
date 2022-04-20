import * as crud from './crud.js';
import { goToHomepage } from './Homepage.js';

const register_button = document.getElementById("register_button");
const login_button = document.getElementById('login_button');
const email_field = document.getElementById('login_email');
const password_field = document.getElementById('login_password');
const listing_button = document.getElementById("create_listing");
const updateName_button = document.getElementById('update_name');


const product1 = document.getElementById("product1");
if (product1 !== null) {
  product1.addEventListener('click', async (e) => {
    console.log("clicked!")
    await crud.getProduct();
  });
}

if (login_button !== null) {
  login_button.addEventListener('click', async (e) => {
    const email = email_field.value;
    const password = password_field.value;
    await crud.login(email, password);
    window.location.href = "Homepage.html"
  });
}

if (register_button !== null){
  register_button.addEventListener('click', async (e) => {
    const email = document.getElementById("email").value;
    console.log(email);
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    await crud.register(username,email, password);
    window.location.href = "user_profile.html"
    //await crud.getUserProfile(username,email,password);
  });
}

if (listing_button !== null) {
  listing_button.addEventListener('click', async (e) => {
    console.log("reached here!")
    const itemName = document.getElementById("itemName").value;
    const price = document.getElementById("price").value;

    const selectedCategory = document.getElementById("category");
    const category = selectedCategory.options[selectedCategory.selectedIndex].text;

    const selectedCondition = document.getElementById("condition");
    const condition = selectedCondition.options[selectedCondition.selectedIndex].text;

    const description = document.getElementById("description").value;
    const images = document.getElementById("images").files[0];
    console.log(images);
    const image_files = document.getElementById("images").files;

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
    goToHomepage(product_data, image_files);
  });
}


if (updateName_button !== null) {
  updateName_button.addEventListener('click', async (e) => {
    const name = document.getElementById('newName').value;
    document.getElementById('user_name').innerHTML = name;
    await crud.updateName(name);
  });
}