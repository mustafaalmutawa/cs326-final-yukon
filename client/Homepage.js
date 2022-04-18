$(document).ready(function() {
    const product = JSON.parse(localStorage.getItem("product"));
    const image_files = JSON.parse(localStorage.getItem("image_files"));
    if (product !== null && image_files !== null) {
        localStorage.removeItem("product");
        localStorage.removeItem("image_files");
        addHomepageListing(product, image_files);
    }
});

export function goToHomepage(product, image_files) {
    localStorage.setItem("product", JSON.stringify(product));
    localStorage.setItem("image_files", JSON.stringify(image_files));
    document.location = "/homepage";
}

let cur_num = 1;

function addHomepageListing(product, image_files) {
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

    for (let i = 0; i < image_files.length; i++) {
        const img = image_files[i];
        const cur_img = document.createElement("div");

        if (i === 0)
            cur_img.setAttribute("class", "carousel-item active");
        else
            cur_img.setAttribute("class", "carousel-item");

        const img_node = document.createElement("img");
        img_node.setAttribute("src", window.URL.createObjectURL(img));
        img_node.setAttribute("class", "d-block w-100");
        img_node.onload = function() {
            URL.revokeObjectURL(this.src);
        }
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

    listing_wrapper.appendChild(h1);
    listing_wrapper.appendChild(h2);

    grid_row_wrapper.appendChild(listing_wrapper);
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