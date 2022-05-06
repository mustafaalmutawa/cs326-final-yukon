import * as crud from './crud.js'

$(document).ready(async function() {
    const grid_row_wrapper = document.getElementById("row");
    const products = await crud.getAllProducts();
    const listingsHTML = await crud.loadListings();
    for (const obj of listingsHTML) {
        /*const listingContainer = document.createElement("div");
        listingContainer.innerHTML = obj.html;
        listingContainer.addEventListener("click", function() {
            window.location.href = obj.url;
        })*/
        //grid_row_wrapper.appendChild(listingContainer);
        grid_row_wrapper.innerHTML += obj.html;
    }
    const listings = document.getElementsByClassName("col-md-3");
    for (let i = 0; i < listings.length; i++) {
        listings[i].addEventListener("click", function() {
            window.location.href = listingsHTML[i].url;
        })
    }
    if (products.length > listingsHTML.length) {
        await addHomepageListing(products.length);
    }   
});

async function addToDatabase(productHTML, id, productURL) {
    await crud.addHTMLToDB(productHTML, id, productURL);
}

export function makeImages(base64Images) {
    const final_images = [];
    for (const url of base64Images) {
        const image = new Image();
        image.src = url;
        final_images.push(image);
    }
    return final_images;
}

export async function addHomepageListing(num) {
    const product = await crud.getMostRecentProduct();

    const grid_row_wrapper = document.getElementById("row");
    const listing_wrapper = document.createElement("div");
    listing_wrapper.setAttribute("class", "product col-md-3 img-thumbnail");
    listing_wrapper.setAttribute("id", product._id.toString());

    const carousel = document.createElement("div");
    carousel.setAttribute("id", `carouselFade${num}`);
    carousel.setAttribute("class", "carousel slide carousel-fade img-fluid"); 
    carousel.setAttribute("data-ride", "carousel");
    listing_wrapper.appendChild(carousel);

    const inner_carousel = document.createElement("div");
    inner_carousel.setAttribute("class", "carousel-inner");
    carousel.appendChild(inner_carousel);

    const image_nodes = makeImages(product.images);

    for (let i = 0; i < image_nodes.length; i++) {
        const img_node = image_nodes[i];
        const cur_img = document.createElement("div");

        if (i === 0)
            cur_img.setAttribute("class", "carousel-item active");
        else
            cur_img.setAttribute("class", "carousel-item");

        img_node.setAttribute("class", "d-block w-100");
        cur_img.appendChild(img_node);
        inner_carousel.appendChild(cur_img);
    }

    const prev_button = makeButton("carousel-control-prev", "carousel-control-prev-icon", "prev", "Previous", num);
    const next_button = makeButton("carousel-control-next", "carousel-control-next-icon", "next", "Next", num);

    carousel.appendChild(prev_button);
    carousel.appendChild(next_button);

    const h1 = document.createElement("h1");
    const h2 = document.createElement("h2");

    const t1 = document.createTextNode(product.itemName);
    const t2 = document.createTextNode("$" + product.price);

    h1.appendChild(t1);
    h2.appendChild(t2);

    h1.setAttribute("style", "font-size: 21px;");
    h2.setAttribute("style", "font-size: 17px;");

    listing_wrapper.appendChild(h1);
    listing_wrapper.appendChild(h2);

    grid_row_wrapper.appendChild(listing_wrapper);

    const productURL = await crud.getProduct(product._id.toString());
    listing_wrapper.addEventListener("click", async function() {
        window.location.href = productURL;
    });

    // after all is done, add the html for this listing to the database.
    await addToDatabase(listing_wrapper.outerHTML, product._id, productURL);
}

function makeButton(c1, c2, ds, text, cur_num) {
    const button = document.createElement("a");
    button.setAttribute("class", c1);
    button.setAttribute("href", `#carouselFade${cur_num}`);
    button.setAttribute("role", "button");
    button.setAttribute("data-slide", ds);

    const icon = document.createElement("span");
    icon.setAttribute("class", c2);
    icon.setAttribute("aria-hidden", "true");

    const text_stuff = document.createElement("span");
    text_stuff.setAttribute("class", "sr-only");
    const text_node = document.createTextNode(text);

    text_stuff.appendChild(text_node);
    button.appendChild(icon);
    button.appendChild(text_stuff);

    return button;
}