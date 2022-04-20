
$(document).ready(async function() {
    //localStorage.removeItem("homepage_listings")
    reload();
    const product = JSON.parse(localStorage.getItem("product"));
    const urls = JSON.parse(localStorage.getItem("image_files"));
    const final_images = [];

    if (product !== null && urls !== null) {
        for (const url of urls) {
            const image = new Image();
            image.src = url;
            final_images.push(image);
        }
        localStorage.removeItem("product");
        localStorage.removeItem("image_files");
        addHomepageListing(product, final_images);
    }
});

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

export async function goToHomepage(product, image_files) {
    const urls_arr = await imagesToURLs(image_files);
    localStorage.setItem("product", JSON.stringify(product));
    localStorage.setItem("image_files", JSON.stringify(urls_arr));
    document.location = "/homepage";
}

let cur_num = 1;

function addHomepageListing(product, image_nodes) {
    const grid_row_wrapper = document.getElementById("real_row");
    const listing_wrapper = document.createElement("div");
    listing_wrapper.setAttribute("class", "col-md-3 img-thumbnail");
    listing_wrapper.setAttribute("id", product.id);

    const carousel = document.createElement("div");
    carousel.setAttribute("id", `carouselFade${cur_num}`);
    carousel.setAttribute("class", "carousel slide carousel-fade img-fluid"); 
    carousel.setAttribute("data-ride", "carousel");
    listing_wrapper.appendChild(carousel);

    const inner_carousel = document.createElement("div");
    inner_carousel.setAttribute("class", "carousel-inner");
    carousel.appendChild(inner_carousel);

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

    const prev_button = makeButton("carousel-control-prev", "carousel-control-prev-icon", "prev", "Previous", cur_num);
    const next_button = makeButton("carousel-control-next", "carousel-control-next-icon", "next", "Next", cur_num);

    cur_num++;

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
    let listings = grid_row_wrapper.innerHTML;
    localStorage.setItem("homepage_listings", listings);
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

function reload() {
    const grid_row_wrapper = document.getElementById("real_row");
    const contents = localStorage.getItem("homepage_listings");
    if (contents !== null)
        grid_row_wrapper.innerHTML = contents;
    else
        grid_row_wrapper.innerHTML = "";
}