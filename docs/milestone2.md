# API Planning

## Endpoints

<strong>/product</strong>
This will be used for GET requests to get the HTML product page.

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

# Breakdown of Labor    
We worked collaboratively during this phase, with each's work receiving feedback from the whole team. Below is the breakdown of what each member worked on significantly.

Nitish : I worked on creating all the GET express request so that each GET request will return a static HTML page. I also worked on the CRUD operation seen in the Crud.js file. This is seen as I contributed in writing the login register and deleteUser crud operations. 

Alex:

Mustafa:

Tatyana:
