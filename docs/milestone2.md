# API Planning

## Endpoints

<strong>/product?id=1234</strong>
This will be used for GET requests to get the HTML page for a product specified by its unique product id. This will be leveraged anytime a user clicks on a product preview tile.

<strong>/product/new</strong>
This endpoint is a POST request, which will allow the user to create a new product. The information entered in the create listing form will be turned into a JSON object and passed as a body to the request.

<strong>/product/buy</strong>
An endpoint via POST that a user will use to “buy” items. The data for checkout and the product being purchased will be contained in the JSON body of the request.

<strong>/product/delete?id=1234</strong>
This endpoint uses the DELETE method to delete the product with the unique product id.

<strong>/user</strong>
This endpoint uses the GET method to retrieve the user profile HTML page for the user.

<strong>/user/new</strong>
The register request simply allows the user to create a new profile via POST. The body of the request will come from the information entered in the sign-up page.

<strong>/user/login</strong>
This endpoint is for existing users. It will work similarly to the /user/new endpoint, but it is a PUT request.

<strong>/user/delete</strong>
This endpoint uses the DELETE method to delete the user that was just created after registration.

<strong>/login</strong>
This endpoint uses the GET request to retrieve the Login HTML page

<strong>/register</strong>
This endpoint uses the GET request to retrieve the Register HTML page

<strong>/homepage</strong>
This endpoint uses the GET request to retrieve the Homepage HTML page

<strong>/listing</strong>
This endpoints uses the GET request to the Create Listing HTML page

# Client Interface

## Create

This is the create listing page, which  allows the user to add a new listing utilzing the CRUD create operation.

## Read

This is the product page. It functions using the CRUD Read operation to retreive and display all the product's information and images.

## Update

This is the user's page. Using the CRUD update operation, tt allows the user to chnage their name——by typing a new name and clicking update.

## Delete

This is also the user's page. It has a delete button, which deletes the user's account using the CRUD delete operation.


# Breakdown of Labor    
We worked collaboratively during this phase, with each's work receiving feedback from the whole team. Below is the breakdown of what each member worked on significantly.

Nitish : I worked on creating all the GET express request so that each GET request will return a static HTML page. I also worked on the CRUD operation seen in the Crud.js file.

Alex:

Mustafa: I worked on some of the CRUD operations in crud.js as well as adding some event listners and CRUD calls in client.js. I added a few endpoints in pcrud-fs.js. I also worked on the making the homepage products clickable and redirect to the product page. Lastly, I did some of the writing inside milestone2.md.

Tatyana:
