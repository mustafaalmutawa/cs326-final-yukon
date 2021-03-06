import * as crud from './crud.js';

const register_button = document.getElementById("register_button");
const login_button = document.getElementById('login_button');
const email_field = document.getElementById('login_email');
const password_field = document.getElementById('login_password');
const listing_button = document.getElementById("create_listing");
const delete_button = document.getElementById("delete_button")
const updateName_button = document.getElementById('update_name');
const updateListing_button = document.getElementById('update_listing');
const updateProduct_buttons = document.getElementsByClassName('updateProduct');
let productToUpdate = 0;

if (delete_button !== null) {
  delete_button.addEventListener('click', async(e) => {
  await crud.deleteUser();
  window.location = "/register";
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
    const inputImages = document.getElementById("images").files;

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

    const images = await imagesToURLs(inputImages);

    const pid = await crud.createProduct(itemName, price, category, condition, description, images, location, shipping, shippingPrice, pickup, payment);
    window.location.href = "Homepage.html";
  });
}

if (updateName_button !== null) {
  updateName_button.addEventListener('click', async (e) => {
    const name = document.getElementById('newName').value;
    document.getElementById('user_name').innerHTML = name;
    await crud.updateName(name);
  });
}

if (updateProduct_buttons != null) {
  for (const button of updateProduct_buttons) {
    button.addEventListener('click', async (e) => {
      productToUpdate = e.target.id;
      await crud.getUpdateListingPage();
      window.location = "/listing/update";
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
    window.location = "/user";
    await crud.updateProduct(productToUpdate, itemName, price, category, condition, description, images, location, shipping, shippingPrice, pickup, payment);
  });
}

function imagesToURLsHelper(image) {
    return new Promise(function (resolve, reject) {
        let fr = new FileReader();
        fr.onload = function (event) {
            resolve(event.target.result);
        }
        fr.readAsDataURL(image);
    });
}

async function imagesToURLs(image_files) {
    let images_arr = Array.prototype.slice.call(image_files);
    try {
        const arr = await Promise.all(images_arr.map(image => imagesToURLsHelper(image)));
        return arr;
    } catch (err) {
        console.log(err);
    }  
}